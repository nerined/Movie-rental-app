"use strict";

// SELECT DOM ELEMENTS
const tableBody = document.getElementsByTagName("tbody")[0];
const tableContainer = document.querySelector(".table__container");

// CHECK IF USER IS LOGGED IN
const currentlyLoggedinUser = getFromSessionStorage("currentLoggedIn");

if (currentlyLoggedinUser) {
  displayYourMovies();
} else {
  tableContainer.innerHTML =
    "<p>You are not allowed to view these details. Please login first</p>";
  setTimeout(function () {
    window.location.href = "../login/login.html";
  }, 1000);
}

//HELPER FUNCTIONS
function getMovieList() {
  let yourMovieList = [];

  try {
    let isPresentInArr = true;
    const arrFromLocalStorage = JSON.parse(localStorage.yourMovieList);

    for (let i = 0; i < arrFromLocalStorage.length; i++) {
      isPresentInArr =
        arrFromLocalStorage[i].userEmail === currentlyLoggedinUser.email;
    }

    if (!isPresentInArr) {
      arrFromLocalStorage.push({
        userEmail: currentlyLoggedinUser.email,
        movies: [],
      });
    }

    yourMovieList = arrFromLocalStorage;
  } catch {
    yourMovieList = [{ userEmail: currentlyLoggedinUser.email, movies: [] }];
  }

  return yourMovieList;
}

function getMoviesList() {
  let movieList = [];

  try {
    movieList = JSON.parse(localStorage.movies);
  } catch {
    movieList = [];
  }

  return movieList;
}

function updateMoviesList(id) {
  const arr = getMoviesList();
  const objIndex = arr.findIndex((obj) => {
    return obj.imdbID === id;
  });

  arr[objIndex].stock++;
  setLocalStorage("movies", arr);
}

function getFromLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name));
}

function setLocalStorage(name, obj) {
  localStorage.setItem(name, JSON.stringify(obj));
}

function getFromSessionStorage(name) {
  return JSON.parse(sessionStorage.getItem(name));
}

function limitNumberWithinRange(num) {
  const MIN = 12;
  const MAX = 168;
  return Math.min(Math.max(num, MIN), MAX);
}

// LOGGER FUNCTIONS
function showError(input, message) {
  input.classList.remove("success");
  input.classList.add("error");
  const formField = input.parentElement.parentElement;
  const error = formField.querySelector(".error-message");
  error.textContent = message;
}

function showSucess(input) {
  input.classList.remove("error");
  input.classList.add("success");
  const formField = input.parentElement.parentElement;
  const error = formField.querySelector(".error-message");
  error.textContent = "";
}

// MAIN FUNCTIONALITY
function displayYourMovies() {
  const list = getMovieList();
  tableBody.innerHTML = "";
  let row = "";

  for (let i = 0; i < list.length; i++) {
    if (
      list[i].userEmail === currentlyLoggedinUser.email &&
      list[i].movies.length !== 0
    ) {
      list[i].movies.forEach((el, index) => {
        row += `
        <tr class="table__row">
            <td class="table__column--first" title=${el.title}>${el.title}</td>
            <td>${el.genre}</td>
            <td>
              <div class="time__wrapper">
                 <button class="time__button time__button--down" data-index=${index}>&lt;</button>
                 <input
                   type="number"
                   name="number"
                   inputmode="numeric" 
                   class="time__input"
                   data-index=${index}
                   value="12"/>
                <button class="time__button time__button--up" data-index=${index}>&gt;</button>
              </div>
           <div class="error-message"> <div>
           </td>
           <td>${el.price}$</td>
           <td>
             <button class="table__button" data-index=${index} data-id=${el.imdbID}>Remove</button>
           </td>
       </tr>
  `;
      });

      tableBody.innerHTML = row;
    }
  }

  document.querySelectorAll(".table__button").forEach(function (button) {
    button.addEventListener("click", function () {
      updateMoviesList(button.dataset.id);

      for (let i = 0; i < list.length; i++) {
        if (
          list[i].userEmail === currentlyLoggedinUser.email &&
          list[i].movies.length !== 0
        ) {
          list[i].movies.splice(button.dataset.index, 1);
          setLocalStorage("yourMovieList", list);
          displayYourMovies();
        }
      }
    });
  });

  document.querySelectorAll(".time__input").forEach(function (input) {
    input.addEventListener("change", function (e) {
      let inputValue = Number(e.target.value.trim());

      if (inputValue % 12 === 0 && inputValue >= 12 && inputValue <= 168) {
        input.value = e.target.value;
        showSucess(input);
      } else {
        showError(input, "Please choose value between 12-168h");
      }
    });
  });

  document.querySelectorAll(".time__button").forEach(function (button) {
    button.addEventListener("click", function () {
      let updatedValue;
      let input =
        document.querySelectorAll(".time__input")[button.dataset.index];

      if (button.classList[1] === "time__button--up") {
        updatedValue = Number(input.value) + 12;
      } else {
        updatedValue = Number(input.value) - 12;
      }

      input.value = limitNumberWithinRange(updatedValue);
    });
  });
}
