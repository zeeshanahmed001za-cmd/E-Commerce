export function initializationCheckoutForm() {
  const checkoutForm = document.querySelector("#checkout-form");

  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(checkoutForm);
    const checkoutData = Object.fromEntries(formData);

    const errors = validateCheckoutData(checkoutData);

    if (Object.keys(errors).length > 0) {
      console.log(errors);
      return;
    }

    console.log(checkoutData);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPhone(phone) {
  return /^\+?[0-9\s-]{7,15}$/.test(phone);
}
function validateCheckoutData(checkoutData) {
  const errors = {};

  const requiredFields = [
    "fullName",
    "email",
    "phone",
    "address",
    "city",
    "state",
    "postalCode",
    "country",
    "paymentMethod",
  ];

  requiredFields.forEach((field) => {
    if (!checkoutData[field] || checkoutData[field].trim() === "") {
      errors[field] = "This field is required";
    }
  });

  if (checkoutData.email && !isValidEmail(checkoutData.email)) {
    errors.email = "Please enter a valid email";
  }

  if (checkoutData.phone && !isValidPhone(checkoutData.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  return errors;
}
