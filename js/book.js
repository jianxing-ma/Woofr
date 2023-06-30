//___________________________________Page Gloabal Variables_____________________________________
//______________________________________________________________________________________________
const pantryAPIBasketPetServiceUrl =
  "https://getpantry.cloud/apiv1/pantry/0306b1cf-df37-49c7-bdbe-eb369a019f17/basket/PET_SERVICE_DATABASE";
// extract username and petData from localStorage data
const userName = JSON.parse(localStorage.getItem("userInfo"))["username"];
const petData = JSON.parse(localStorage.getItem("userPets"));
let serviceData = {};

//__________________________________Add EventListeners_______________________________________
//___________________________________________________________________________________________
document
  .querySelector("#service_selector")
  .addEventListener("change", handleServiceSelection);

document.getElementById("appointment_form")
  .addEventListener("submit", (e) => handleFormSubmission(e));

//__________________________Functions for Handling EventListeners______________________
//_____________________________________________________________________________________

function handleFormSubmission(e) {
  e.preventDefault(e);

  var timeSelector = document.getElementById("time_selector");
  var serviceSelector = document.getElementById("service_selector");

  // define the user's selected values so that they can be packaged and generated into something on my-account.html
  var selectedPet = pet_selector.value;
  var selectedDate = date_calendar.value;
  // var selectedtime = time_selector.value;
  var timeValue = time_selector.value;
  var selectedtime = timeSelector.options[timeValue].text;
  // var selectedService = service_selector.value;
  var selectedService =
    serviceSelector.options[serviceSelector.selectedIndex].text;
  var selectedServiceOption = service_generated_options.value;

  // get selected pet's service data
  let selectedPetServiceData = {};

  if (selectedPet in serviceData) {
    selectedPetServiceData = serviceData[selectedPet];
  }

  const serviceKey = selectedPet + "-" + selectedDate + "-" + selectedtime;

  selectedPetServiceData[serviceKey] = {
    pet: pet_selector.options[pet_selector.selectedIndex].textContent,
    date: selectedDate,
    time: selectedtime,
    service: selectedService,
    "service-type": selectedServiceOption,
  };

  const obj = {};
  obj[selectedPet] = selectedPetServiceData;
  serviceData[selectedPet] = obj[selectedPet];
  localStorage.setItem("serviceData", JSON.stringify(serviceData));

  // push updated pet service history to pantry
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(obj);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(pantryAPIBasketPetServiceUrl, requestOptions).catch((error) =>
    console.log("error", error)
  );
}


//_______________________Functions for DOM Page Content Generation__________________________
//__________________________________________________________________________________________

function loadPetSelector() {
  document.querySelector("#pet_selector").innerHTML =
    "<option selected>Select Pet</option>";

  for (petId in petData) {
    const petName = petData[petId]["pet-name"];
    const petOption = document.createElement("option");
    petOption.value = petId;
    petOption.textContent = petName;

    document.getElementById("pet_selector").appendChild(petOption);
  }
}

function handleServiceSelection() {
  var select = document.getElementById("service_selector");
  var selection = select.options[select.selectedIndex].value;
  if (selection === "1") {
    document.getElementById("generated_form").innerHTML = `
        <select id="service_generated_options" class="form-select" aria-label="Grooming Selection">
  <option selected>Select a Treatment</option>
  <option value="Royal Bath">Royal Bath ($100)</option>
  <option value="Deluxe Bath">Deluxe Bath ($75)</option>
  <option value="Standard Bath">Standard Bath ($50)</option>
</select>

        `;
    document.getElementById(
      "dynamic_submit"
    ).innerHTML = `<button type="submit" class="btn btn-secondary">Book Now!</button>`;
  }
  if (selection === "2") {
    document.getElementById("generated_form").innerHTML = `
        <select id="service_generated_options" class="form-select" aria-label="Walking Selection">
        <option selected>Select an Adventure</option>
        <option value="30 min">30 min ($30)</option>
        <option value="60 min">60 min ($50)</option>
        <option value="90 min">90 min ($70)</option>
      </select>
        `;
    document.getElementById(
      "dynamic_submit"
    ).innerHTML = `<button type="submit" class="btn btn-secondary">Book Now!</button>`;
  }
  if (selection === "3") {
    document.getElementById("generated_form").innerHTML = `
        <select id="service_generated_options" class="form-select" aria-label="Boarding Selection">
        <option selected>Select a Stay</option>
        <option value="Private Suite">Private Suite ($70)</option>
        <option value="Group Boarding">Group Boarding ($45)</option>
      </select>
        `;
    document.getElementById(
      "dynamic_submit"
    ).innerHTML = `<button type="submit" class="btn btn-secondary">Book Now!</button>`;
  }
}


//_________________________Functions for Loading User Data___________________________
//___________________________________________________________________________________

function loadPetServiceHistory() {
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
      serviceData = data;
    })
    .catch((error) => console.log("error", error));
}

document.addEventListener("DOMContentLoaded", () => {
  loadPetSelector();
  loadPetServiceHistory();
});