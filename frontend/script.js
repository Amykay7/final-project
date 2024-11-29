
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

registerForm.addEventListener('submit', async(e) => {
    e.preventDefault(); //prevent default form behaviour
    //collect form input
    const email = document.getElementById('regEmail').value;
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    //send a post request to the server to register user
    const response = await fetch('/auth/register',{
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        //prepare data as json to be sent too backend
        body:JSON.stringify({email, username, password})
    })
    //parse the response from the server
    const result = await response.json();
    //handle the response based on status code
    if(response.status===201){
        alert(result.message);
        registerForm.reset();
    } else{
        alert(result.message);
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    alert(`${email} has logged in!`);
    window.location.href = 'planner.html';
});


// Weekly Planner Logic
const weeklyPlannerForm = document.getElementById("weekly-planner-form");
const weeklyPlannerList = document.getElementById("weekly-plan-items");

// Add a meal plan to the weekly planner
weeklyPlannerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const day = document.getElementById("day").value;
    const meal = document.getElementById("meal-plan").value;

    // Send data to the backend using Fetch API
    fetch('/api/planner/add-meal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ day, meal })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                ${day.charAt(0).toUpperCase() + day.slice(1)} - ${meal}
                <button class="delete-btn" data-id="${data.id}">Delete</button>
            `;
            weeklyPlannerList.appendChild(listItem);
            addDeleteFunctionality(listItem);
            document.getElementById("meal-plan").value = "";
        } else {
            alert('Failed to add meal');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred');
    });
});

// Shopping List Logic
const shoppingListForm = document.getElementById("shopping-list-form");
const shoppingList = document.getElementById("list-items");

// Add a shopping item
shoppingListForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const itemName = document.getElementById("item-name").value;
    const category = document.getElementById("category").value;
    const organic = document.getElementById("organic").checked ? " (Organic)" : "";

    // Send data to the backend using Fetch API
    fetch('/api/planner/add-item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemName, category, organic })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                ${itemName} - ${category.charAt(0).toUpperCase() + category.slice(1)}${organic}
                <button class="delete-btn" data-id="${data.id}">Delete</button>
            `;
            shoppingList.appendChild(listItem);
            addDeleteFunctionality(listItem);
            document.getElementById("item-name").value = "";
            document.getElementById("organic").checked = false;
        } else {
            alert('Failed to add item');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred');
    });
});

// Delete Functionality
function addDeleteFunctionality(listItem) {
    const deleteBtn = listItem.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        const itemId = deleteBtn.dataset.id;

        // Send delete request to the backend
        fetch(`/api/planner/delete-item/${itemId}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                listItem.remove();
            } else {
                alert('Failed to delete item');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred');
        });
    });
}

// Function to delete a meal from the weekly plan
function deleteMealFunctionality(listItem) {
    const deleteBtn = listItem.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        const day = deleteBtn.dataset.id;

        // Send delete request to the backend
        fetch(`/api/planner/delete-meal/${day}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                listItem.remove();
            } else {
                alert('Failed to delete meal');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred');
        });
    });
}

// Load current weekly plan and shopping list from the backend when the page loads
document.addEventListener("DOMContentLoaded", () => {
    // Load weekly plan
    fetch('/api/planner/weekly-plan')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                data.plan.forEach(meal => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `
                        ${meal.day.charAt(0).toUpperCase() + meal.day.slice(1)} - ${meal.meal}
                        <button class="delete-btn" data-id="${meal.id}">Delete</button>
                    `;
                    weeklyPlannerList.appendChild(listItem);
                    deleteMealFunctionality(listItem);
                });
            }
        });

    // Load shopping list
    fetch('/api/planner/shopping-list')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                data.items.forEach(item => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `
                        ${item.itemName} - ${item.category.charAt(0).toUpperCase() + item.category.slice(1)}${item.organic}
                        <button class="delete-btn" data-id="${item.id}">Delete</button>
                    `;
                    shoppingList.appendChild(listItem);
                    addDeleteFunctionality(listItem);
                });
            }
        });
});
