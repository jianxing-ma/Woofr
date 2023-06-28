import { validateLogin } from "./login.js";
window.onload = validateLogin;

// Tooltips for hover over information on the services-description.html page
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);
function sendEmail(event) {
  event.preventDefault(); // Prevent the form from submitting

  // Get the form data
  const firstName = document.getElementById("first_name").value;
  const lastName = document.getElementById("last_name").value;
  const email = document.getElementById("exampleFormControlInput1").value;
  const country = document.getElementById("country").value;
  const zipCode = document.getElementById("zipcode").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const topic = document.getElementById("topic").value;
  const phoneNumber = document.getElementById("phone_number").value;
  const message = document.getElementById("message").value;

  // // Prepare the email parameters
  const params = {
    from_name: firstName + " " + lastName,
    from_email: email,
    country: country,
    zip_code: zipCode,
    city: city,
    state: state,
    topic: topic,
    phone_number: phoneNumber,
    message: message,
  };
  const publicKey = "BIMdAmDlPCcPKoY6k";
  emailjs.init("BIMdAmDlPCcPKoY6k");
  // // Send the email using EmailJS
  emailjs
    .sendForm("service_s1bs8hk", "template_x4sgdmh", "#contactForm", publicKey)
    .then(
      function (response) {
        console.log("Email sent successfully", response.status, response.text);
        // Reset the form
        document.getElementById("contactForm").reset();
      },
      function (error) {
        console.error("Error sending email", error);
      }
    );
}

// Attach the form submission event listener
// document.getElementById("contactForm").addEventListener("submit", sendEmail);
