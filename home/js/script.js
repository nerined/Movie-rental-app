"use strict";

// CLEAR THE LOCALsTORAGE???

import { moviesList } from "../../data.js";

const tableBody = document.getElementsByTagName("tbody")[0];
const logOutBtn = document.querySelector("#logOutBtn");

function getList() {
  let list = [];
  try {
    list = JSON.parse(localStorage.movies);
  } catch {
    list = moviesList;
  }
  return list;
}

function getMovieList() {
  let yourMovieList = [];
  try {
    yourMovieList = JSON.parse(localStorage.yourMovieList);
  } catch {
    yourMovieList = [];
  }
  return yourMovieList;
}

logOutBtn.addEventListener("click", function () {
  const usersFromSessionStorage = JSON.parse(
    sessionStorage.getItem("currentLoggedIn")
  );

  if (usersFromSessionStorage) {
    sessionStorage.clear();
  }
  window.location.href = "../login/login.html";
});

function displayMovies() {
  const list = getList();

  tableBody.innerHTML = "";
  let row = "";
  list.forEach((el, index) => {
    row += `<tr><td class="table__column--first">${el.title}</td>
    <td>${el.genre}</td>
    <td>${el.price}$</td>
    <td>
      <img
        src =
          ${
            el.stock > 0
              ? "dir/../../assets/icon-check.png"
              : "dir/../../assets/icon-cross.png"
          }

        alt="Stock icon"
        class="table__icon"
      />
    </td>
    <td><button class="table__button" data-index=${index} ${
      el.stock > 0 ? "" : "disabled"
    }>Rent</button></td> </tr>`;

    // tableBody.insertAdjacentHTML("beforeend", row);
  });
  tableBody.innerHTML = row;

  document.querySelectorAll(".table__button").forEach(function (button) {
    button.addEventListener("click", function () {
      const movie = list[button.dataset.index];
      const yourMovies = getMovieList();
      yourMovies.push(movie);
      localStorage.yourMovieList = JSON.stringify(yourMovies);

      list[button.dataset.index].stock--;
      localStorage.movies = JSON.stringify(list);

      displayMovies();
    });
  });
}

displayMovies();
