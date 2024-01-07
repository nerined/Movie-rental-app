"use strict";

// const duration = [12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156, 168];

const tableBody = document.getElementsByTagName("tbody")[0];

function getMovieList() {
  let yourMovieList = [];
  try {
    yourMovieList = JSON.parse(localStorage.yourMovieList);
  } catch {
    yourMovieList = [];
  }
  return yourMovieList;
}

function getList() {
  let movieList = [];
  try {
    movieList = JSON.parse(localStorage.movies);
  } catch {
    movieList = [];
  }
  return movieList;
}

function updateList(id) {
  const arr = getList();
  const objIndex = arr.findIndex((obj) => {
    return obj.imdbID === id;
  });

  arr[objIndex].stock++;
  localStorage.movies = JSON.stringify(arr);
}

// function stepUp(id) {
//   displayYourMovies();
// }

// function stepDown(id) {
//   displayYourMovies();
// }

function limitNumberWithinRange(num) {
  const MIN = 12;
  const MAX = 168;
  // const parsed = parseInt(num);
  return Math.min(Math.max(num, MIN), MAX);
}

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

function displayYourMovies() {
  const list = getMovieList();

  tableBody.innerHTML = "";

  if (list.length !== 0) {
    let row = "";
    list.forEach((el, index) => {
      row += `<tr class="table__row">
  <td class="table__column--first" title=${el.title}>${el.title}</td>
  <td>${el.genre}</td>
  <td>
    <div class="time__wrapper">
      <button class="time__button time__button--down" data-index=${index}>&lt;</button
      ><input
        type="number"
        name="number"
        inputmode="numeric" 
        class="time__input"
        data-index=${index}
        value="12"
      /><button class="time__button time__button--up" data-index=${index}>&gt;</button>
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
    // tableBody.insertAdjacentHTML("beforeend", row);
  }

  document.querySelectorAll(".table__button").forEach(function (button) {
    button.addEventListener("click", function () {
      updateList(button.dataset.id);
      list.splice(button.dataset.index, 1);
      localStorage.yourMovieList = JSON.stringify(list);
      displayYourMovies();
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

displayYourMovies();
