document.querySelector("#service_selector").addEventListener("change", handleServiceSelection);
document.getElementById("dynamic_submit").addEventListener("submit", handleFormSubmission);

function handleServiceSelection () {
    var select = document.getElementById('service_selector'); 
    var selection = select.options[select.selectedIndex].value; 
    if (selection === "1"){
        document.getElementById('generated_form').innerHTML = `
        <select id="grooming_options" class="form-select" aria-label="Grooming Selection">
  <option selected>Select a Treatment</option>
  <option value="1">Royal Bath ($100)</option>
  <option value="2">Deluxe Bath ($75)</option>
  <option value="3">Standard Bath ($50)</option>
</select>
        
        `;
        document.getElementById('dynamic_submit').innerHTML = `<button type="button" class="btn btn-secondary">Book Now!</button>`;
    } if (selection === "2"){
        document.getElementById('generated_form').innerHTML = `
        <select id="walking_options" class="form-select" aria-label="Walking Selection">
        <option selected>Select an Adventure</option>
        <option value="1">30 min ($30)</option>
        <option value="2">60 min ($50)</option>
        <option value="3">90 min ($70)</option>
      </select>   
        `;
        document.getElementById('dynamic_submit').innerHTML = `<button type="button" class="btn btn-secondary">Book Now!</button>`;
    }if (selection === "3") {
        document.getElementById('generated_form').innerHTML = `
        <select id="boarding_options" class="form-select" aria-label="Boarding Selection">
        <option selected>Select a Stay</option>
        <option value="1">Private Suite ($70)</option>
        <option value="2">Group Boarding ($45)</option>
      </select>
        `;
        document.getElementById('dynamic_submit').innerHTML = `<button type="button" class="btn btn-secondary">Book Now!</button>`;
    }
}

function handleFormSubmission(e) {
    e.preventDefault(e);
    // define the user's selected values so that they can be packaged and generated into something on my-account.html
    var selectedPet = pet_selector.options[pet_selector.selectedIndex].text;
    var selectedDate = date_calendar.data //unsure of how to extract this value
    var selectedtime = time_selector.options[time_selector.selectedIndex].text;
    var selectedService = service_selector.options[service_selector.selectedIndex].text;
    // unsure of how to access the selection from the generated selector here
    var groomingSelection = grooming_options.options[grooming_options.selectedIndex].text;
    var walkingSelection = walking_options.options[walking_options.selectedIndex].text;
    var boardingSelection = boarding_options.options[boarding_options.selectedIndex].tex;
    
}

