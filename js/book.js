document.querySelector("#service_selector").addEventListener("change", handleServiceSelection);

function handleServiceSelection () {
    var select = document.getElementById('service_selector'); 
    var text = select.options[select.selectedIndex].text; 
    console.log(text);
}



// function handleServiceSelection() {
//     var select = document.getElementById('language'); 
//     var value = select.options[select.selectedIndex].value; 
//     console.log(value); // en 
// }
