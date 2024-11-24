
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

loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    alert(`${email} has logged in!`);
    window.location.href = 'planner.html';
});


// Weekly Planner
document.getElementById('weekly-planner-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const day = document.getElementById('day').value;
    const mealPlan = document.getElementById('meal-plan').value;
    const planItem = document.createElement('li');
    planItem.textContent = `${day}: ${mealPlan}`;
    document.getElementById('weekly-plan-items').appendChild(planItem);
});

// Shopping List
document.getElementById('shopping-list-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const itemName = document.getElementById('item-name').value;
    const category = document.getElementById('category').value;
    const organic = document.getElementById('organic').checked ? ' (Organic)' : '';
    const listItem = document.createElement('li');
    listItem.innerHTML = `${itemName} - ${category}${organic} <button class="delete-item">Delete</button>`;
    document.getElementById('list-items').appendChild(listItem);

    //form validation
    const successMessage = document.createElement('div');
successMessage.textContent = 'Item added successfully!';
successMessage.style.color = 'green';
document.body.appendChild(successMessage);
setTimeout(() => successMessage.remove(), 3000); // Remove after 3 seconds

    // Delete item functionality
    listItem.querySelector('.delete-item').addEventListener('click', function() {
        listItem.remove();
    });
});

// Recipe Suggestions
const recipeForm = document.getElementById("recipe-form");
const ingredientInput = document.getElementById("ingredient");
const recipeResults = document.getElementById("recipe-results");

// Handling form submission for recipe suggestions
recipeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const ingredient = ingredientInput.value.trim();

    if (ingredient) {
        // Fetch recipe suggestions based on the ingredient
        fetchRecipeSuggestions(ingredient);
    } else {
        alert("Please enter an ingredient!");
    }
});

// Fetching recipe suggestions (using static example data for now)
function fetchRecipeSuggestions(ingredient) {
    // Example static recipe data (replace with API call for dynamic suggestions)
    const recipes = [
        { name: "Tomato Salad", description: "A fresh and healthy tomato salad made with ripe tomatoes, onions, and a vinaigrette." },
        { name: "Vegetable Soup", description: "A warm, hearty vegetable soup made with carrots, peas, and potatoes." },
        { name: "Apple Pie", description: "A delicious homemade apple pie made with cinnamon and freshly picked apples." }
    ];

    // Clear previous results
    recipeResults.innerHTML = '';

    // Displaying fetched recipes
    recipes.forEach(recipe => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${recipe.name}</strong>: ${recipe.description}`;
        recipeResults.appendChild(li);
    });
}
