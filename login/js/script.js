"use strict";

/* Debounce functionality */
/* Invisible password */

const emailSignInEl = document.querySelector("#email");
const passwordSignInEl = document.querySelector("#current-password");
const userNameEl = document.querySelector("#new-name");
const userSurnameEl = document.querySelector("#new-surname");
const emailSignUpEl = document.querySelector("#new-email");
const emailConfirmEl = document.querySelector("#repeat-email");
const passwordSignUpEl = document.querySelector("#new-password");
const passwordConfirmEl = document.querySelector("#repeat-password");

const formSignUpEl = document.querySelector("#form-signup");
const formSignInEl = document.querySelector("#form-signin");

const buttonVisibility = document.querySelector(".form__button--visibility");
// const buttonSignIn = document.querySelector(".form__button--signin");

const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min) => length < min;

const isEmailValid = (email) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};
const isPasswordValid = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  return regex.test(password);
};

const showError = (input, message) => {
  const formField = input.parentElement;

  formField.classList.remove("success");
  formField.classList.add("error");

  const error = formField.querySelector(".form-message");
  error.textContent = message;
};

const showSucess = (input) => {
  const formField = input.parentElement;

  formField.classList.add("success");
  formField.classList.remove("error");

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
  } else if (isBetween(usernameValue.length, min)) {
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
  } else if (isBetween(surnameValue.length, min)) {
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
const validatePassword = function (elem) {
  let valid = false;
  const passwordValue = elem.value.trim();

  if (!isRequired(passwordValue)) {
    showError(elem, "Password cannot be empty");
  } else if (!isPasswordValid(passwordValue)) {
    showError(
      elem,
      `Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)`
    );
  } else {
    showSucess(elem);
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
const validateEmail = function (elem) {
  let valid = false;
  const emailValue = elem.value.trim();

  if (!isRequired(emailValue)) {
    showError(elem, "Email cannot be empty");
  } else if (!isEmailValid(emailValue)) {
    showError(elem, "Email is not valid");
  } else {
    showSucess(elem);
    valid = true;
  }
  return valid;
};

// Validate confirm email
const validateConfirmEmail = function () {
  let valid = false;
  const emailConfirmValue = emailConfirmEl.value.trim();
  const emailValue = emailSignUpEl.value.trim();

  if (!isRequired(emailConfirmValue)) {
    showError(emailConfirmEl, "Please enter password again");
  } else if (emailValue !== emailConfirmValue) {
    showError(emailConfirmEl, "Confirm email does not match");
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
      validateEmail(emailSignUpEl);
      break;
    case "repeat-email":
      validateConfirmEmail();
      break;
    case "new-password":
      validatePassword(passwordSignUpEl);
      break;
    case "repeat-password":
      validateConfirmPassword();
      break;
    default:
      "This field does not require input";
  }
});

formSignInEl.addEventListener("input", function (e) {
  switch (e.target.id) {
    case "email":
      validateEmail(emailSignInEl);
      break;
    case "current-password":
      validatePassword(passwordSignInEl);
      break;

    default:
      "This field does not require input";
  }
});

formSignInEl.addEventListener("submit", function (e) {
  e.preventDefault();

  const isEmailValid = validateEmail(emailSignInEl);
  const isPasswordValid = validatePassword(passwordSignInEl);
  const isFormValid = isEmailValid && isPasswordValid;

  if (isFormValid) {
    window.location.href = "../home/home.html";
  }
});

formSignUpEl.addEventListener("submit", function (e) {
  e.preventDefault();

  const isNameValid = validateName();
  const isSurnameValid = validateSurname();
  const isEmailValid = validateEmail(emailSignUpEl);
  const isConfirmEmailValid = validateConfirmEmail();
  const isPasswordValid = validatePassword(passwordSignUpEl);
  const isConfirmPasswordValid = validateConfirmPassword();

  const isFormValid =
    isNameValid &&
    isSurnameValid &&
    isEmailValid &&
    isConfirmEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;

  if (isFormValid) {
    window.location.href = "../home/home.html";
  }
});

buttonVisibility.addEventListener("click", function () {
  if (formSignUpEl.style.display === "") {
    formSignUpEl.style.display = "grid";
    this.style.display = "none";
  }
});
