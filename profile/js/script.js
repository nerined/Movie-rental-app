// CHECK IF CURRENT USER IS PRESENT

const profileDetails = document.querySelector(".profile__details");
const resetEmailBtn = document.querySelector(".profile__button--left");
const profileContainer = document.querySelector(".profile__container");
let userDetails = {};

const currentlyLoggedinUser = JSON.parse(
  sessionStorage.getItem("currentLoggedIn")
);

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

function updateEmail(changedEmail) {
  const usersFromlocalStorage = JSON.parse(
    localStorage.getItem("registeredUsers")
  );
  const registeredUsers = usersFromlocalStorage;

  for (let i = 0; i < registeredUsers.length; i++) {
    if (registeredUsers[i].email === userDetails.email) {
      registeredUsers[i].email = changedEmail;
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
      break;
    }
  }

  userDetails.email = changedEmail;
  sessionStorage.setItem("currentLoggedIn", JSON.stringify(userDetails));
}

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
