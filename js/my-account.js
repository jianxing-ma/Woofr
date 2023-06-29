//_______________________________________________________________________________________
//_______________________________________________________________________________________

const pantryAPIBasketPetsUrl =
  "https://getpantry.cloud/apiv1/pantry/0306b1cf-df37-49c7-bdbe-eb369a019f17/basket/PET_DATABASE";

const username = JSON.parse(localStorage.getItem("userInfo")).username;

let userPets = {};

document.getElementById("add_pet_form").addEventListener("submit", (e) => {
  e.preventDefault();

  loadUserPetsData().then(() => handleAddPetForm(e));
});

function getUserAndPetData() {
  document.getElementById("user_account_info").innerHTML = `




  `;
}

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

      console.log("Data retrieved successfully:", userPets);
    })

    .catch((error) => console.log("error", error));
}

function handleAddPetForm(e) {
  // ...rest of the code
}

function populateUserAndPetData(username) {
  console.log("Populating user and pet data:", userPets);

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

document.addEventListener("DOMContentLoaded", () => {
  loadUserPetsData().then(() => populateUserAndPetData(username));
});