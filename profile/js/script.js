const profileDetails = document.querySelector(".profile__details");
const resetEmailBtn = document.querySelector(".profile__button--left");

// take user details from session storage
const users = [
  {
    name: "John",
    surname: "Newman",
    email: "john.newman@gmail.com",
  },
];

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

function displayProfile(email = users[0].email) {
  profileDetails.innerHTML = "";

  const accountDetail = `
  <p><strong>Name: </strong>${users[0].name}</p>
  <p><strong>Surname: </strong>${users[0].surname}</p>
  <p><strong>Email: </strong>${email}</p>
  `;
  profileDetails.insertAdjacentHTML("beforeend", accountDetail);

  resetEmailBtn.addEventListener("click", function () {
    const email = prompt("Please input a new value for email");

    if (validateEmail(email)) {
      displayProfile(email);
    } else {
      return;
    }
  });
}

displayProfile();
