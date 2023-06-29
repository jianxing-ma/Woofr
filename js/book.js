const pantryAPIBasketPetServiceUrl = "https://getpantry.cloud/apiv1/pantry/0306b1cf-df37-49c7-bdbe-eb369a019f17/basket/PET_SERVICE_DATABASE";

document.querySelector("#service_selector").addEventListener("change", handleServiceSelection);
document.getElementById("dynamic_submit").addEventListener("submit", handleFormSubmission);

// extract username and petData from localStorage data
const userName = JSON.parse(localStorage.getItem("userInfo")).username;
const petData = JSON.parse(localStorage.getItem("userPets"));
let serviceData = {};

function handleServiceSelection () {
    var select = document.getElementById('service_selector'); 
    var selection = select.options[select.selectedIndex].value; 
    if (selection === "1"){
        document.getElementById('generated_form').innerHTML = `
        <select id="service_generated_options" class="form-select" aria-label="Grooming Selection">
  <option selected>Select a Treatment</option>
  <option value="1">Royal Bath ($100)</option>
  <option value="2">Deluxe Bath ($75)</option>
  <option value="3">Standard Bath ($50)</option>
</select>
        
        `;
        document.getElementById('dynamic_submit').innerHTML = `<button type="submit" class="btn btn-secondary">Book Now!</button>`;
    } if (selection === "2"){
        document.getElementById('generated_form').innerHTML = `
        <select id="service_generated_options" class="form-select" aria-label="Walking Selection">
        <option selected>Select an Adventure</option>
        <option value="1">30 min ($30)</option>
        <option value="2">60 min ($50)</option>
        <option value="3">90 min ($70)</option>
      </select>   
        `;
        document.getElementById('dynamic_submit').innerHTML = `<button type="submit" class="btn btn-secondary">Book Now!</button>`;
    }if (selection === "3") {
        document.getElementById('generated_form').innerHTML = `
        <select id="service_generated_options" class="form-select" aria-label="Boarding Selection">
        <option selected>Select a Stay</option>
        <option value="1">Private Suite ($70)</option>
        <option value="2">Group Boarding ($45)</option>
      </select>
        `;
        document.getElementById('dynamic_submit').innerHTML = `<button type="submit" class="btn btn-secondary">Book Now!</button>`;
    }
}

document.getElementById("appointment_form").addEventListener("submit", e => handleFormSubmission(e));

function handleFormSubmission(e) {
    e.preventDefault(e);

    // define the user's selected values so that they can be packaged and generated into something on my-account.html
    var selectedPet = pet_selector.value;
    var selectedDate = date_calendar.value;
    var selectedtime = time_selector.value;
    var selectedService = service_selector.value;
    var selectedServiceOption = service_generated_options.value;

    // get selected pet's service data
    let selectedPetServiceData = {};

    if (selectedPet in serviceData) {
      selectedPetServiceData = serviceData[selectedPet];
    }

    const serviceKey = selectedPet + "-" + selectedDate + "-" + selectedtime;

    console.log(pet_selector.textContent);
    
    selectedPetServiceData[serviceKey] = {"pet": pet_selector.textContent, "date": selectedDate, "time": selectedtime, "service": selectedService, "service-type": selectedServiceOption};

    const obj ={};
    obj[selectedPet] = selectedPetServiceData;

    // push updated pet service history to pantry
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(obj);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(pantryAPIBasketPetServiceUrl, requestOptions)
    .catch(error => console.log('error', error));
}

function loadPetSelector() {
  document.querySelector("#pet_selector").innerHTML = '<option selected>Select Pet</option>';

  for (petId in petData) {
    const petName = petData[petId]["pet-name"];
    const petOption = document.createElement("option");
    petOption.value = petId;
    petOption.textContent = petName;

    document.getElementById("pet_selector").appendChild(petOption);
  }
}

function loadPetServiceHistory() {
  // Load pet service history
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(pantryAPIBasketPetServiceUrl, requestOptions)
  .then(response => response.json())
  .then(data => {
    serviceData = data;
  })
  .catch(error => console.log('error', error));
}

document.addEventListener("DOMContentLoaded", () => { 

  loadPetServiceHistory(); 

}); 

// DELETE after problem resolved
book_services_page_load_btn.addEventListener("click", loadPetSelector);
book_services_page_load_service_btn.addEventListener("click", loadPetServiceHistory);

