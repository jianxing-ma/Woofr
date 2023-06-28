const pantryAPIBasketPetsUrl = "https://getpantry.cloud/apiv1/pantry/0306b1cf-df37-49c7-bdbe-eb369a019f17/basket/PET_DATABASE";

document.getElementById("add_pet_form").addEventListener("submit", (e) => {
    handleAddPetForm(e);
})

function handleAddPetForm(e) {
    e.preventDefault();

    // get data from user
    const addPetFormName = getInputValue("add_pet_form_name");
    const addPetFormBreed = getInputValue("add_pet_form_breed");
    const addPetFormAge = getInputValue("add_pet_form_age");
    const addPetIsIntact = document.querySelector('input[name="add_pet_form_is_intact"]:checked').value;
    const addPetShotsUpToDate = document.querySelector('input[name="add_pet_form_shots_up_to_date"]:checked').value;

    const username = JSON.parse(localStorage.getItem("userInfo")).username;

    const userPetInfo = {"pet-name": addPetFormName, "pet-breed": addPetFormBreed, "pet-age": addPetFormAge, "pet-is-intact": addPetIsIntact, "pet-shots-up-to-date": addPetShotsUpToDate};

    const object = {};
    object[username] = userPetInfo;
    const raw = JSON.stringify(object);

    // Initial staging for pushing data to pantry
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(pantryAPIBasketPetsUrl, requestOptions)
    .catch(error => console.log('error', error));
}


// helper function to get user input
function getInputValue(id) {
    return document.getElementById(id).value;
}