"use strict";

// SELECT DOM ELEMENTS
const formSignUpEl = document.querySelector("#form-signup");
const formSignInEl = document.querySelector("#form-signin");
const emailSignInInput = document.querySelector("#email");
const passwordSignInInput = document.querySelector("#current-password");
const nameInput = document.querySelector("#new-name");
const surnameInput = document.querySelector("#new-surname");
const emailSignUpInput = document.querySelector("#new-email");
const emailConfirmEl = document.querySelector("#repeat-email");
const passwordSignUpInput = document.querySelector("#new-password");
const passwordConfirmInput = document.querySelector("#repeat-password");
const openRegisterFormBtn = document.querySelector(".form__button--visibility");
const messageSuccessEl = document.querySelector(".info__message--success");
const messageWarningEl = document.querySelector(".info__message--warning");
const messageErrorEl = document.querySelector(".info__message--error");
const togglePassword = document.querySelector("#toggle-password");
let registeredUsers = [];

const usersFromlocalStorage = getFromLocalStorage("registeredUsers");

if (usersFromlocalStorage) {
  registeredUsers = usersFromlocalStorage;
}

// USER INPUT VALIDATION
function validateName() {
  let valid = false;
  const nameValue = nameInput.value.trim();
  const min = 2;

  if (!isRequired(nameValue)) {
    showError(nameInput, "User name cannot be empty");
  } else if (isBetween(nameValue.length, min)) {
    showError(nameInput, `Name must be at least ${min} characters`);
  } else {
    showSucess(nameInput);
    valid = true;
  }
  return valid;
}

function validateSurname() {
  let valid = false;
  const surnameValue = surnameInput.value.trim();
  const min = 2;

  if (!isRequired(surnameValue)) {
    showError(surnameInput, "Surname cannot be empty");
  } else if (isBetween(surnameValue.length, min)) {
    showError(surnameInput, `Surname must be at least ${min} characters`);
  } else {
    showSucess(surnameInput);
    valid = true;
  }
  return valid;
}

function validatePassword(elem) {
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
}

function validateConfirmPassword() {
  let valid = false;
  const passwordConfirmValue = passwordConfirmInput.value.trim();
  const passwordValue = passwordSignUpInput.value.trim();

  if (!isRequired(passwordConfirmValue)) {
    showError(passwordConfirmInput, "Please enter password again");
  } else if (passwordValue !== passwordConfirmValue) {
    showError(passwordConfirmInput, "Confirm password does not match");
  } else {
    showSucess(passwordConfirmInput);
    valid = true;
  }
  return valid;
}

function validateEmail(elem) {
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
}

function validateConfirmEmail() {
  let valid = false;
  const emailConfirmValue = emailConfirmEl.value.trim();
  const emailValue = emailSignUpInput.value.trim();

  if (!isRequired(emailConfirmValue)) {
    showError(emailConfirmEl, "Please enter password again");
  } else if (emailValue !== emailConfirmValue) {
    showError(emailConfirmEl, "Confirm email does not match");
  } else {
    showSucess(emailConfirmEl);
    valid = true;
  }
  return valid;
}

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

// LOGGER SERVICE
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

// DEBOUNCING
function debounce(func) {
  let timeoutId;

  return function (arg) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(arg);
    }, 500);
  };
}

// FEEDBACK FEATURE
formSignUpEl.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "new-name":
        validateName();
        break;
      case "new-surname":
        validateSurname();
        break;
      case "new-email":
        validateEmail(emailSignUpInput);
        break;
      case "repeat-email":
        validateConfirmEmail();
        break;
      case "new-password":
        validatePassword(passwordSignUpInput);
        break;
      case "repeat-password":
        validateConfirmPassword();
        break;
      default:
        "This field does not require input";
    }
  })
);

formSignInEl.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "email":
        validateEmail(emailSignInInput);
        break;
      case "current-password":
        validatePassword(passwordSignInInput);
        break;

      default:
        "This field does not require input";
    }
  })
);

// HELPER FUNCTIONS TO GET DATA FROM STORAGE
function setLocalStorage(name, obj) {
  localStorage.setItem(name, JSON.stringify(obj));
}

function setSessionStorage(name, obj) {
  sessionStorage.setItem(name, JSON.stringify(obj));
}

function getFromLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name));
}

// SIGN IN AND REGISTER FUNCTIONALITY
function canLogin() {
  const emailInput = emailSignInInput.value.trim().toLowerCase();
  const passwordInput = passwordSignInInput.value.trim();
  let areCredentialsCorrect = false;

  if (registeredUsers.length > 0) {
    for (let i = 0; i < registeredUsers.length; i++) {
      if (
        registeredUsers[i].email === emailInput &&
        registeredUsers[i].password === passwordInput
      ) {
        areCredentialsCorrect = true;
        break;
      }
    }
  }

  return areCredentialsCorrect;
}

function checkDuplicateEmail() {
  let isUnique = true;
  const emailInput = emailSignUpInput.value.trim().toLowerCase();

  for (let i = 0; i < registeredUsers.length; i++) {
    if (registeredUsers[i].email === emailInput) {
      isUnique = false;
      break;
    }
  }

  return isUnique;
}

function addLoggedinUser(emailInput) {
  emailInput = emailInput.value.trim().toLowerCase();
  const currentUser = registeredUsers.filter((obj) => {
    return obj.email === emailInput;
  });
  const unwrapObj = function ({ name, surname, email }) {
    return { name, surname, email };
  };

  const updatedObj = unwrapObj(currentUser[0]);
  setSessionStorage("currentLoggedIn", updatedObj);
}

function addNewUser() {
  const name = nameInput.value.trim();
  const surname = surnameInput.value.trim();
  const password = passwordSignUpInput.value.trim();
  const email = emailSignUpInput.value.trim().toLowerCase();
  const user = { name, surname, password, email };
  registeredUsers.push(user);
  setLocalStorage("registeredUsers", registeredUsers);
}

formSignInEl.addEventListener("submit", function (e) {
  e.preventDefault();
  const isEmailValid = validateEmail(emailSignInInput);
  const isPasswordValid = validatePassword(passwordSignInInput);
  const isFormValid = isEmailValid && isPasswordValid;
  const isLoginSuccessful = canLogin();

  if (isFormValid && isLoginSuccessful) {
    addLoggedinUser(emailSignInInput);
    window.location.href = "../home/home.html";
  } else if (isFormValid && !isLoginSuccessful) {
    messageErrorEl.style.display = "block";
  }
});

formSignUpEl.addEventListener("submit", function (e) {
  e.preventDefault();
  messageErrorEl.style.display = "";
  const isNameValid = validateName();
  const isSurnameValid = validateSurname();
  const isEmailValid = validateEmail(emailSignUpInput);
  const isConfirmEmailValid = validateConfirmEmail();
  const isPasswordValid = validatePassword(passwordSignUpInput);
  const isConfirmPasswordValid = validateConfirmPassword();
  const isFormValid =
    isNameValid &&
    isSurnameValid &&
    isEmailValid &&
    isConfirmEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;
  const isEmailUnique = checkDuplicateEmail();

  if (isFormValid && isEmailUnique) {
    addNewUser();
    addLoggedinUser(emailSignUpInput);
    messageWarningEl.style.display = "";
    messageSuccessEl.style.display = "block";
    setTimeout(function () {
      window.location.href = "../home/home.html";
    }, 1000);
  } else if (isFormValid && !isEmailUnique) {
    messageWarningEl.style.display = "block";
  }
});

// ADDITIONAL FUNCTIONALITY: TOGGLE PASSWORD AND SHOW REGISTER FORM
togglePassword.addEventListener("click", function (e) {
  const type =
    passwordSignInInput.getAttribute("type") === "password"
      ? "text"
      : "password";
  passwordSignInInput.setAttribute("type", type);
  this.classList.toggle("bi-eye");
});

openRegisterFormBtn.addEventListener("click", function () {
  if (formSignUpEl.style.display === "") {
    formSignUpEl.style.display = "grid";
    this.style.display = "none";
  }
});
