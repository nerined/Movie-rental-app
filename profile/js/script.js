"use strict";

// SELECT DOM ELEMENTS
const profileDetails = document.querySelector(".profile__details");
const resetEmailBtn = document.querySelector(".profile__button--left");
const profileContainer = document.querySelector(".profile__container");
let userDetails = {};

// CHECK IF USER IS LOGGED IN
const currentlyLoggedinUser = getFromSessionStorage("currentLoggedIn");

if (currentlyLoggedinUser) {
  userDetails = currentlyLoggedinUser;
  renderProfile();
} else {
  profileContainer.innerHTML =
    "<p>You are not allowed to view these details. Please login first</p>";
  setTimeout(function () {
    window.location.href = "../login/login.html";
  }, 2000);
}

//// USER INPUT VALIDATION
const validateEmail = function (elem) {
  if (elem === null) return;
  let valid = false;
  const emailValue = elem.trim();

  if (!isRequired(emailValue)) {
    showError("Email cannot be empty");
  } else if (!isEmailValid(emailValue)) {
    showError("Email is not valid");
  } else {
    showSucess(`Your email has been updated to ${elem}`);
    valid = true;
  }

  return valid;
};

const isEmailValid = (email) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const isRequired = (value) => (value === "" ? false : true);

const showError = (message) => {
  alert(message);
};

const showSucess = (message) => {
  alert(message);
};

// HELPER FUNCTIONS
function getFromLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name));
}

function setLocalStorage(name, obj) {
  localStorage.setItem(name, JSON.stringify(obj));
}

function getFromSessionStorage(name) {
  return JSON.parse(sessionStorage.getItem(name));
}

function setSessionStorage(name, obj) {
  sessionStorage.setItem(name, JSON.stringify(obj));
}

function updateEmail(changedEmail) {
  const registeredUsers = getFromLocalStorage("registeredUsers");
  const yourMoviesList = getFromLocalStorage("yourMovieList");

  for (let i = 0; i < registeredUsers.length; i++) {
    if (registeredUsers[i].email === userDetails.email) {
      registeredUsers[i].email = changedEmail;
      setLocalStorage("registeredUsers", registeredUsers);
      break;
    }
  }

  if (yourMoviesList) {
    for (let i = 0; i < yourMoviesList.length; i++) {
      if (yourMoviesList[i].userEmail === userDetails.email) {
        yourMoviesList[i].userEmail = changedEmail;
        setLocalStorage("yourMovieList", yourMoviesList);
        break;
      }
    }
  }

  userDetails.email = changedEmail;
  setSessionStorage("currentLoggedIn", userDetails);
}

// MAIN FUNCTIONALITY
function renderProfile() {
  profileDetails.innerHTML = "";
  const accountDetail = `
      <p><strong>Name: </strong>${userDetails.name}</p>
      <p><strong>Surname: </strong>${userDetails.surname}</p>
      <p><strong>Email: </strong>${userDetails.email}</p>
  `;

  profileDetails.insertAdjacentHTML("beforeend", accountDetail);
}

resetEmailBtn.addEventListener("click", function () {
  const email = prompt("Please input a new value for email");
  const isEmailValid = validateEmail(email);

  if (isEmailValid) {
    updateEmail(email);
    renderProfile();
  }
});
