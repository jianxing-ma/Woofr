
//___________________________________Page Gloabal Variables_____________________________________
//______________________________________________________________________________________________
const pantryAPIBasketPetsUrl =
  "https://getpantry.cloud/apiv1/pantry/0306b1cf-df37-49c7-bdbe-eb369a019f17/basket/PET_DATABASE";

const pantryAPIBasketPetServiceUrl = "https://getpantry.cloud/apiv1/pantry/0306b1cf-df37-49c7-bdbe-eb369a019f17/basket/PET_SERVICE_DATABASE"

let username = JSON.parse(localStorage.getItem("userInfo")).username;
// potential modification: 
// let userPets = JSON.parse(localStorage.getItem("userPets"));
let userPets = {};

//__________________________________Add EventListeners_______________________________________
//___________________________________________________________________________________________
document.addEventListener("DOMContentLoaded", () => {
  loadUserPetsData().then(() => {
    populateUserAndPetData(username);
    for (petId in userPets) {
      document
        .getElementById(petId)
        .addEventListener("click", (e) => populatePetServiceData(e));
    }
  });
  
  loadPetServiceHistoryInAccount();
});

document.getElementById("add_pet_form").addEventListener("submit", (e) => {
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
    "pet-is-intact": document.querySelector('input[name="add_pet_form_is_intact"]:checked').value,
    "pet-shots-up-to-date": document.querySelector('input[name="add_pet_form_shots_up_to_date"]:checked').value,
  };

  userPets[petId] = userPetInfo;
  const object = {};
  object[username] = userPets;
  const raw = JSON.stringify(object);

  // Initial staging for pushing data to pantry
  const requestOptions = generatePutRequestOptions("PUT", raw);

  fetch(pantryAPIBasketPetsUrl, requestOptions)
    .then( () => {
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
    <div class="card" style="width: 18rem;">
    <h5> ${username} </h5>
    <ul id="updated_pet_list" class="list-group list-group-flush">
    </ul>
  </div>
  `;

  for (petId in userPets) {
    const petName = userPets[petId]["pet-name"];
    const petlist = document.createElement("li");
    petlist.classList.add("list-group-item");
    petlist.classList.add("btn", "btn-primary");
    petlist.setAttribute("id", petId);
    petlist.textContent = petName;
    document.getElementById("updated_pet_list").appendChild(petlist);
  }
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
      localStorage.setItem("serviceData", JSON.stringify(data))
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
