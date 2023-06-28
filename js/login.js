// check user login status, and update login related elements accordingly
export function validateLogin(){

    if (typeof pills_register_form != "undefined") {
        pills_register_form.addEventListener("submit", (e) => handleAccountRegistrationFormSubmit(e));
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
                Username
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
    })
    }else {
        const loginButton = document.createElement("div");
        loginButton.innerHTML = `
        <a id="login_btn" class="btn btn-primary" href="./login.html">Login</a>
        `
        login_btn_container.innerHTML = "";
        login_btn_container.append(loginButton);
    }
}

export function handleAccountRegistrationFormSubmit(e) {
    e.preventDefault();

    // get data from user
    const registerName = getInputValue("register_mame");
    const registerUsername = getInputValue("register_username");
    const registerEmail = getInputValue("register_email");
    const registerPassword = getInputValue("register_password");
    const registerRepeatPassword = getInputValue("register_repeat_password");

    if (registerPassword === registerRepeatPassword) {

        const userInfo = {"name": registerName, "username": registerUsername, "email": registerEmail, "password": registerPassword, "logged-in": true};

        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        alertRegistrationSuccess();
    }else {
        alert("Passwords do not match!")
    }
}

function alertRegistrationSuccess() {
    const alertMessage = document.createElement("div");
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

function getInputValue(id) {
    return document.getElementById(id).value;
}