// Dark/Light Mode Toggle
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const icon = document.getElementById('theme-icon');
  if (document.body.classList.contains('dark-mode')) {
    document.body.style.backgroundColor = '#121212';
    document.body.style.color = 'white';
    icon.className = 'fa-solid fa-sun';
  } else {
    document.body.style.backgroundColor = '#f4f4f4';
    document.body.style.color = '#333';
    icon.className = 'fa-solid fa-moon';
  }
}

// Animate skill bars on scroll
window.addEventListener('DOMContentLoaded', () => {
  const skills = document.querySelectorAll('.skill');

  skills.forEach(skill => {
    const level = skill.getAttribute('data-level'); // get percentage
    const fill = skill.querySelector('.fill');
    const percentText = skill.querySelector('.percent');

    fill.style.width = level + '%'; // dynamically fill bar
    percentText.textContent = level + '%'; // show percentage
  });
});

emailjs.init("n4Pd5MGAP3OeNwWaC"); // Your EmailJS public key

const form = document.getElementById("contactForm");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const popupClose = document.getElementById("popup-close");

// Close popup when user clicks "x"
popupClose.onclick = function() {
  popup.style.display = "none";
};

// Close popup when user clicks outside content
window.onclick = function(event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
};

form.addEventListener("submit", function(event){
  event.preventDefault();

  // Get values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const purpose = document.getElementById("purpose").value.trim();

  // Validation
  if(!name){
    showPopup("Please enter your full name.");
    return;
  }
  if(!email || !validateEmail(email)){
    showPopup("Please enter a valid email.");
    return;
  }
  if(!phone || !validatePhone(phone)){
    showPopup("Please enter a valid phone number.");
    return;
  }
  if(!purpose){
    showPopup("Purpose / Message cannot be empty.");
    return;
  }

  // Prepare EmailJS template params
  const templateParams = {
    from_name: name,
    from_email: email,
    phone: phone,
    message: purpose
  };

  // Send email
  emailjs.send("service_8kj3agj", "template_e4wukup", templateParams)
    .then(function(response) {
      showPopup("Message sent successfully!", true);
      form.reset();
    }, function(error) {
      showPopup("Failed to send message. Try again.");
      console.error(error);
    });
});

// Function to show popup
function showPopup(message, success=false){
  popupMessage.textContent = message;
  popupMessage.style.color = success ? "green" : "red";
  popup.style.display = "block";
}

// Simple email validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Simple phone validation (digits only, 10-15 characters)
function validatePhone(phone){
  const re = /^[0-9]{10,15}$/;
  return re.test(phone);
}
