const pantryAPIBasketPetsUrl =
  "https://getpantry.cloud/apiv1/pantry/0306b1cf-df37-49c7-bdbe-eb369a019f17/basket/PET_DATABASE";

const username = JSON.parse(localStorage.getItem("userInfo")).username;
let userPets = {};

document.addEventListener("DOMContentLoaded", () => {
  loadUserPetsData()
  .then(() => populateUserAndPetData(username));
})

document.getElementById("add_pet_form").addEventListener("submit", (e) => { 
  e.preventDefault(); 
  loadUserPetsData().then(() => handleAddPetForm(e)); 
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
      userPets = data[username];
      localStorage.setItem("userPets", JSON.stringify(userPets));
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
  .catch((error) =>
    console.log("error", error)
  );
}

function populateUserAndPetData(username) {
  document.getElementById("user_account_info").innerHTML = `
    <div class="card" style="width: 18rem;">
    <h5> ${username} </h5>
    <ul id= "updated_pet_list" class="list-group list-group-flush">
    </ul>
  </div>
  `;

  for (petId in userPets) {
    const petName = userPets[petId]["pet-name"];
    const petlist = document.createElement("li");
    petlist.classList.add("list-group-item");
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