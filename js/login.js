const pantryAPIBasketUrl = "https://getpantry.cloud/apiv1/pantry/0306b1cf-df37-49c7-bdbe-eb369a019f17/basket/USER_ACCOUNT_DATABASE";

// check user login status, and update login related elements accordingly
export function validateLogin(){

    if (typeof pills_register_form != "undefined") {
        pills_register_form.addEventListener("submit", (e) => handleAccountRegister(e));
    }

    if (typeof pills_login_form != "undefined") {
        pills_login_form.addEventListener("submit", (e) => handleAccountLogin(e));
    }

    if(JSON.parse(localStorage.getItem("userInfo"))) {
        const profileButton = document.createElement("div");
        profileButton.innerHTML = `
        <div id="profile_btn" class="dropstart">
            <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            >
                ${JSON.parse(localStorage.getItem("userInfo")).name}
            </button>
            <ul class="dropdown-menu dropdown-menu-dark">
                <li><a class="dropdown-item active" href="my-account.html">My Account</a></li>
                <li><a class="dropdown-item" href="book-services.html">Book A Service</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li><a id="btn_sign_out" class="dropdown-item">Sign Out</a></li>
            </ul>
        </div>
        `

        login_btn_container.innerHTML = "";
        login_btn_container.append(profileButton);
        
        document.getElementById("btn_sign_out").addEventListener("click", () => {
            localStorage.clear();
        document.location.reload();
        });
    }else {
        const loginButton = document.createElement("div");
        loginButton.innerHTML = `
        <a id="login_btn" class="btn btn-primary" href="./login.html">Login</a>
        `
        login_btn_container.innerHTML = "";
        login_btn_container.append(loginButton);
    }
}

//___________________________________________________________________________
//____________________________ Registration__________________________________
//___________________________________________________________________________
export function handleAccountRegister(e) {
    e.preventDefault();

    // get data from user
    const registerName = getInputValue("register_mame");
    const registerUsername = getInputValue("register_username");
    const registerEmail = getInputValue("register_email");
    const registerPassword = getInputValue("register_password");
    const registerRepeatPassword = getInputValue("register_repeat_password");

    if (registerPassword === registerRepeatPassword) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(pantryAPIBasketUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            if (registerUsername in data) {
                alert("Username is already taken!");
            }else {
                const userInfo = {"name": registerName, "username": registerUsername, "email": registerEmail, "password": registerPassword};
        
                localStorage.setItem("userInfo", JSON.stringify(userInfo));
                updateUserInfoToDatabase(userInfo);
        
                alertRegistrationSuccess();
            }
        })
        .catch(error => console.log('error', error));
    }else {
        alert("Passwords do not match!");
    }
}

// Toast message to redirect user to account page following login
function alertRegistrationSuccess() {
    const alertMessage = document.createElement("div");
    alertMessage.classList.add("d-flex");
    alertMessage.classList.add("justify-content-center");

    alertMessage.innerHTML = `
    <div class="card" style="width: 18rem;">
        <img src="https://tlg-23-04-sde-2.github.io/Team-Woofr/images/dog_welcome.jpg" class="card-img-top" alt="Woofr">
        <div class="card-body">
            <h5 class="card-title">Woofr</h5>
            <p class="card-text">Welcome Onboard!</p>
            <a id="jump_to_account_page" href="./my-account.html" class="btn btn-success">Continue</a>
        </div>
    </div>
    `;

    pill_container.innerHTML = "";
    pill_container.append(alertMessage);
}

//__________________________________________________________________________________
//____________________________________Login_________________________________________
//__________________________________________________________________________________

function handleAccountLogin(e) {
    e.preventDefault();

    // get data from user
    const inputUsername = getInputValue("login_username");
    const inputPassword = getInputValue("login-password");

    // retrieve user database
    const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

    fetch(pantryAPIBasketUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            if (inputUsername in data) {
                if (data[inputUsername].password === inputPassword) {
                    const userInfo = {"name": data[inputUsername].name, "username": inputUsername, "email": data[inputUsername].email};
        
                    localStorage.setItem("userInfo", JSON.stringify(userInfo));
        
                    alertRegistrationSuccess();
                }else {
                    alert("Invalid password!");
                }
            }else {
                alert("Invalid username!");
            }
        })
        .catch(error => console.log('error', error));
}

//__________________________________Database Process________________________________

function updateUserInfoToDatabase(userInfo) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const object = {};
    object[userInfo.username] = userInfo;
    const raw = JSON.stringify(object);

    let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(pantryAPIBasketUrl, requestOptions)
    .catch(error => console.log('error', error));
}

function getUserInfoFromDatabase(result) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(pantryAPIBasketUrl, requestOptions)
    .then(response => response.json())
    .then(data => {result = data;})
    .catch(error => console.log('error', error));
}

// helper function to get user input
function getInputValue(id) {
    return document.getElementById(id).value;
}