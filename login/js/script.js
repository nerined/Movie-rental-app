"use strict";

const emailSignInEl = document.querySelector("#email");
const passwordSignInEl = document.querySelector("#current-password");
const userNameEl = document.querySelector("#new-name");
const userSurnameEl = document.querySelector("#new-surname");
const emailSignupEl = document.querySelector("#new-email");
const emailConfirmEl = document.querySelector("#repeat-email");
const passwordSignUpEl = document.querySelector("#new-password");
const passwordConfirmEl = document.querySelector("#repeat-password");
const formField = document.querySelector(".form-field");
const formSignUpEl = document.querySelector("#form-signup");
const formSignInEl = document.querySelector("#form-signin");

const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) => length < min || length > max;

const isEmailValid = (email) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};
const isPasswordValid = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  return password.test(password);
};

const showError = (input, message) => {
  const formField = input.parentElement;

  formField.classList.remove("sucess");
  formField.classList.add("error");

  const error = formField.querySelector(".form-message");
  error.textContent = message;
};

const showSucess = (input) => {
  const formField = input.parentElement;

  formField.classList.remove("error");
  formField.classList.add("sucess");

  const error = formField.querySelector(".form-message");
  error.textContent = "";
};

// Validate name field
// Name field should contain two or more letters and cannot be empty
const validateName = function () {
  let valid = false;
  const usernameValue = userNameEl.value.trim();
  const min = 2;

  if (!isRequired(usernameValue)) {
    showError(userNameEl, "User name cannot be empty");
  } else if (!isBetween(usernameValue.length, min)) {
    showError(userNameEl, `Name must be at least ${min} characters`);
  } else {
    showSucess(userNameEl);
    valid = true;
  }
  return valid;
};

// Validate surname field
// Surname field should contain two or more letters and cannot be empty
const validateSurname = function () {
  let valid = false;
  const surnameValue = userSurnameEl.value.trim();
  const min = 2;

  if (!isRequired(surnameValue)) {
    showError(userSurnameEl, "Surname cannot be empty");
  } else if (!isBetween(surnameValue.lenght, min)) {
    showError(userSurnameEl, `Surname must be at least ${min} characters`);
  } else {
    showSucess(userSurnameEl);
    valid = true;
  }
  return valid;
};

// Validate password field
// Password should be 8 or more symbols long and cannot be empty
// Password again should match the password field and cannot be empty
const validatePassword = function () {
  let valid = false;
  const passwordValue = passwordSignUpEl.value.trim();

  if (!isRequired(passwordValue)) {
    showError(passwordSignUpEl, "Password cannot be empty");
  } else if (!isPasswordValid(passwordValue)) {
    showError(
      passwordSignUpEl,
      `Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)`
    );
  } else {
    showSucess(passwordSignUp);
    valid = true;
  }
  return valid;
};

// Validate confirm password
const validateConfirmPassword = function () {
  let valid = false;
  const passwordConfirmValue = passwordConfirmEl.value.trim();
  const passwordValue = passwordSignUpEl.value.trim();

  if (!isRequired(passwordConfirmValue)) {
    showError(passwordConfirmEl, "Please enter password again");
  } else if (passwordValue !== passwordConfirmValue) {
    showError(passwordConfirmEl, "Confirm password does not match");
  } else {
    showSucess(passwordConfirmEl);
    valid = true;
  }
  return valid;
};

// Validate email field
// Email field should be in valid email format and cannot be empty
// Email again should be the same as the Email field and cannot be empty
const validateEmail = function () {
  let valid = false;
  const emailValue = emailSignupEl.value.trim();

  if (!isRequired(emailValue)) {
    showError(emailSignupEl, "Email cannot be empty");
  } else if (!isEmailValid(emailValue)) {
    showError(emailSignupEl, "Email is not valid");
  } else {
    showSucess(emailSignupEl);
    valid = true;
  }
  return valid;
};

// Validate confirm email
const validateConfirmEmail = function () {
  let valid = false;
  const emailConfirmValue = emailConfirmEl.value.trim();
  const emailValue = emailSignupEl.value.trim();

  if (!isRequired(emailConfirmValue)) {
    showError(emailConfirmEl, "Please enter password again");
  } else if (password !== emailConfirmValue) {
    showError(emailConfirmEl, "Confirm password does not match");
  } else {
    showSucess(emailConfirmEl);
    valid = true;
  }
  return valid;
};

// Instant feedback feature
formSignUpEl.addEventListener("input", function (e) {
  switch (e.target.id) {
    case "new-name":
      validateName();
      break;
    case "new-surname":
      validateSurname();
      break;
    case "new-email":
      validateEmail();
      break;
    case "repeat-email":
      validateConfirmEmail();
      break;
    case "new-password":
      validatePassword();
      break;
    case "repeat-password":
      validateConfirmPassword();
      break;
    default:
      "This field does not require input";
  }
});
formSignInEl.addEventListener("submit", function (e) {
  // prevent form from submitting
  e.preventDefault();
});

formSignUpEl.addEventListener("submit", function (e) {
  e.preventDefault();

  const isNameValid = validateName();
  const isSurnameValid = validateSurname();
  const isEmailValid = validateEmail();
  const isConfirmEmailValid = validateConfirmEmail();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();

  const isFormValid =
    isNameValid() &&
    isSurnameValid() &&
    isEmailValid() &&
    isConfirmEmailValid() &&
    isPasswordValid() &&
    isConfirmPasswordValid();

  if (isFormValid) {
    // redirect to home page
  }
});
