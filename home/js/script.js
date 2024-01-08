"use strict";

import { moviesList } from "../../data.js";

// SELECT DOM ELEMENTS
const tableBody = document.getElementsByTagName("tbody")[0];
const logOutBtn = document.querySelector("#logOutBtn");
const tableContainer = document.querySelector(".table-container");

const currentlyLoggedinUser = JSON.parse(
  sessionStorage.getItem("currentLoggedIn")
);

if (currentlyLoggedinUser) {
  displayMovies();
} else {
  tableContainer.innerHTML =
    "<p>You are not allowed to view these details. Please login first</p>";
  setTimeout(function () {
    window.location.href = "../login/login.html";
  }, 1000);
}

function getMoviesList() {
  let list = [];
  try {
    list = JSON.parse(localStorage.movies);
  } catch {
    list = moviesList;
    localStorage.movies = JSON.stringify(list);
  }
  return list;
}

function getYourMoviesList() {
  // let yourMovieList = [{ userEmail: currentlyLoggedinUser.email, movies: [] }];
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

function displayMovies() {
  const list = getMoviesList();
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
  });
  tableBody.innerHTML = row;

  document.querySelectorAll(".table__button").forEach(function (button) {
    button.addEventListener("click", function () {
      const movie = list[button.dataset.index];
      const yourMovies = getYourMoviesList();

      for (let i = 0; i < yourMovies.length; i++) {
        if (yourMovies[i].userEmail === currentlyLoggedinUser.email) {
          yourMovies[i].movies.push(movie);
          break;
        }
      }
      localStorage.yourMovieList = JSON.stringify(yourMovies);
      list[button.dataset.index].stock--;
      localStorage.movies = JSON.stringify(list);
      displayMovies();
    });
  });
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
