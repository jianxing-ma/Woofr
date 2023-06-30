//___________________________________Page Gloabal Variables_____________________________________
//______________________________________________________________________________________________
const pantryAPIBasketPetsUrl =
  "https://getpantry.cloud/apiv1/pantry/0306b1cf-df37-49c7-bdbe-eb369a019f17/basket/PET_DATABASE";

const pantryAPIBasketPetServiceUrl =
  "https://getpantry.cloud/apiv1/pantry/0306b1cf-df37-49c7-bdbe-eb369a019f17/basket/PET_SERVICE_DATABASE";

let username = JSON.parse(localStorage.getItem("userInfo")).username;
let userPets = {};
let userPetPhoto;

//__________________________________Add EventListeners_______________________________________
//___________________________________________________________________________________________
document.addEventListener("DOMContentLoaded", () => {
  loadUserPetsData().then(() => {
    populateUserAndPetData(username);
    for (petId in userPets) {
      document.getElementById(petId).addEventListener("click", (e) => {
        populatePetServiceData(e);
      });
    }
  });

  loadPetServiceHistoryInAccount();
});

addPetForm = document
  .getElementById("add_pet_form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    handleAddPetForm(e);
  });

//__________________________Functions for Handling EventListeners______________________
//_____________________________________________________________________________________
function handleAddPetForm(e) {
  const petId = username + "-" + getInputValue("add_pet_form_name");
  const userPetInfo = {
    "pet-name": getInputValue("add_pet_form_name"),
    "pet-breed": getInputValue("add_pet_form_breed"),
    "pet-age": getInputValue("add_pet_form_age"),
    "pet-is-intact": document.querySelector(
      'input[name="add_pet_form_is_intact"]:checked'
    ).value,
    "pet-shots-up-to-date": document.querySelector(
      'input[name="add_pet_form_shots_up_to_date"]:checked'
    ).value,
  };

  userPets[petId] = userPetInfo;
  const object = {};
  object[username] = userPets;
  const raw = JSON.stringify(object);

  // Initial staging for pushing data to pantry
  const requestOptions = generatePutRequestOptions("PUT", raw);

  fetch(pantryAPIBasketPetsUrl, requestOptions)
    .then(() => {
      localStorage.setItem("userPets", JSON.stringify(object));
      // update page pet listing
      populateUserAndPetData(username);
    })
    .catch((error) => console.log("error", error));
}

//_______________________Functions for DOM Page Content Generation__________________________
//__________________________________________________________________________________________
function populatePetServiceData(e) {
  petId = e.target.getAttribute("id");

  document.getElementById("booked_services").innerHTML = `
  <div class="card" style="width: 18rem;">
  <h3>${petId}</h3>
  <ul id="booked_service_list" class="list-group list-group-flush">
  </ul>
</div>
  `;
  var petServiceData = JSON.parse(localStorage.getItem("serviceData"))[petId];

  for (serviceId in petServiceData) {
    let serviceItem = document.createElement("li");

    serviceItem.textContent = `${petServiceData[serviceId]["date"]}, ${petServiceData[serviceId]["time"]}, ${petServiceData[serviceId]["service"]}, ${petServiceData[serviceId]["service-type"]}`;
    document.getElementById("booked_service_list").appendChild(serviceItem);
  }
}

function populateUserAndPetData(username) {
  document.getElementById("user_account_info").innerHTML = `

  <button id="userNameButton" class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
  ${username}
</button>
<ul id="updated_pet_list" class="dropdown-menu dropdown-menu-dark"">
</ul>
  `;

  for (petId in userPets) {
    const petName = userPets[petId]["pet-name"];
    const petlist = document.createElement("li");
    petlist.classList.add("pet-li");

    const actionLink = document.createElement("a");
    actionLink.setAttribute("id", petId);
    actionLink.classList.add("dropdown-item");
    actionLink.href = "#";

    actionLink.textContent = petName;

    petlist.appendChild(actionLink);
    document.getElementById("updated_pet_list").appendChild(petlist);
  }
}

const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
const appendAlert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);

  setTimeout(() => {
    wrapper.remove();
  }, 2000);
};

const alertTrigger = document.getElementById("liveAlertBtn");
if (alertTrigger) {
  alertTrigger.addEventListener("click", () => {
    const formData = new FormData(document.getElementById("add_pet_form"));
    const petName = document.getElementById("add_pet_form_name").value;
    const petType = document.getElementById("add_pet_form_breed").value;
    if (petName === "" || petType === "") {
      appendAlert("Please fill in all required fields.", "danger");
    } else {
      appendAlert("Nice, you successfully added a pet!", "success");
    }
  });
}

//_________________________Functions for Loading User Data___________________________
//___________________________________________________________________________________
function loadUserPetsData() {
  const requestOptions = generateGetRequestOptions("GET");

  return fetch(pantryAPIBasketPetsUrl, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data[username] !== undefined) {
        userPets = data[username];
        localStorage.setItem("userPets", JSON.stringify(data[username]));
      }
    })
    .catch((error) => console.log("error", error));
}

function loadPetServiceHistoryInAccount() {
  // Load pet service history
  const requestOptions = generateGetRequestOptions("GET");

  fetch(pantryAPIBasketPetServiceUrl, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("serviceData", JSON.stringify(data));
    })
    .catch((error) => console.log("error", error));
}

//__________________________________________________________________________________________
//——————————————————————————————————HELPER FUNCTIONS————————————————————————————————————————
// Database Helper Functions
function generatePutRequestOptions(action, raw) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  return {
    method: action,
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
}

function generateGetRequestOptions(action) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  return {
    method: action,
    headers: myHeaders,
    redirect: "follow",
  };
}

// helper function to get user input
function getInputValue(id) {
  return document.getElementById(id).value;
}
