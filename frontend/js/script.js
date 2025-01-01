document.addEventListener('DOMContentLoaded',async()=>{
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    
    registerForm?.addEventListener('submit', async(e) => {
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
        const password = document.getElementById('login-password').value;
        //send a post request to the server to login the user
        const response = await fetch('/auth/login', async(event)=>{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,password
            })
        })
        //parse the response from the server
        const result = response.json();
        //handle response based on status code
        if(response.status ===200){
            alert(result.message);
            loginForm.reset();
            window.location.href='./planner.html'
        }else{
            alert(result.message)
        }
    });
})


// Weekly Planner Form
document.getElementById('weekly-planner-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const day = document.getElementById('day').value;
    const meal = document.getElementById('meal-plan').value;

    const response = await fetch('/planner/meal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ day, meal }),
    });

    const data = await response.json();
    if (response.ok) {
        alert(data.message);
        // Update the displayed meal plan in the UI
    } else {
        alert(data.message);
    }
});

// Shopping List Form
document.getElementById('shopping-list-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const itemName = document.getElementById('item-name').value;
    const category = document.getElementById('category').value;
    const organic = document.getElementById('organic').checked;

    const response = await fetch('/planner/item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemName, category, organic }),
    });

    const data = await response.json();
    if (response.ok) {
        alert(data.message);
        // Update the shopping list in the UI
    } else {
        alert(data.message);
    }
});
