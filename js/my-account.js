const pantryAPIBasketPetsUrl =
  "https://getpantry.cloud/apiv1/pantry/0306b1cf-df37-49c7-bdbe-eb369a019f17/basket/PET_DATABASE";

const pantryAPIBasketPetServiceUrl = "https://getpantry.cloud/apiv1/pantry/0306b1cf-df37-49c7-bdbe-eb369a019f17/basket/PET_SERVICE_DATABASE"

const username = JSON.parse(localStorage.getItem("userInfo")).username;
let userPets = {};
let userPetServices = {};

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

function loadUserPetsData() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(pantryAPIBasketPetsUrl, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data[username] !== undefined) {
        userPets = data[username];
        localStorage.setItem("userPets", JSON.stringify(userPets));
      }
    })
    .catch((error) => console.log("error", error));
}

function handleAddPetForm(e) {
  // get data from user
  const addPetFormName = getInputValue("add_pet_form_name");
  const addPetFormBreed = getInputValue("add_pet_form_breed");
  const addPetFormAge = getInputValue("add_pet_form_age");
  const addPetIsIntact = document.querySelector(
    'input[name="add_pet_form_is_intact"]:checked'
  ).value;
  const addPetShotsUpToDate = document.querySelector(
    'input[name="add_pet_form_shots_up_to_date"]:checked'
  ).value;

  const petId = username + "-" + addPetFormName;

  const userPetInfo = {
    "pet-name": addPetFormName,
    "pet-breed": addPetFormBreed,
    "pet-age": addPetFormAge,
    "pet-is-intact": addPetIsIntact,
    "pet-shots-up-to-date": addPetShotsUpToDate,
  };

  userPets[petId] = userPetInfo;
  const object = {};
  object[username] = userPets;
  const raw = JSON.stringify(object);

  // Initial staging for pushing data to pantry
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(pantryAPIBasketPetsUrl, requestOptions)
    .then(localStorage.setItem("userPets", JSON.stringify(object)))
    .catch((error) => console.log("error", error));
}

function populatePetServiceData(e) {
  petId = e.target.getAttribute("id");

  document.getElementById("booked_services").innerHTML = `
  <div class="card" style="width: 18rem;">
  <h3>${petId}</h3>
  <ul id="booked_service_list" class="list-group list-group-flush"> 
  </ul>
</div>
  `;
  var serviceData = JSON.parse(localStorage.getItem("serviceData"))[petId];
  for (serviceId in serviceData) {
    let serviceItem = document.createElement("li");
    serviceItem.textContent = `${serviceData[serviceId]["date"]}, ${serviceData[serviceId]["time"]}, ${serviceData[serviceId]["service"]}, ${serviceData[serviceId]["service-type"]}`;
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

function getUserAndPetData() {
  document.getElementById("user_account_info").innerHTML = ` 
  `;
}

// helper function to get user input
function getInputValue(id) {
  return document.getElementById(id).value;
}

//_________________________TEMPARARY___________________________
function loadPetServiceHistoryInAccount() {
  // Load pet service history
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(pantryAPIBasketPetServiceUrl, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("serviceData", JSON.stringify(data))
    })
    .catch((error) => console.log("error", error));
}