// const moviesList = [
//   {
//     imdbID: "tt1375666",
//     title: "Inception",
//     Year: "2010",
//     genre: "Action",
//     price: 2.55,
//     stock: 6,
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     title: "The Matrix",
//     Year: "1999",
//     genre: "Sci-Fi",
//     price: 5.0,
//     stock: 6,
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     title: "Parasite",
//     Year: "2019",
//     genre: "Thriller",
//     price: 8.95,
//     stock: 3,
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     title: "Oppenheimer",
//     Year: "2023",
//     genre: "Thriller",
//     price: 15.99,
//     stock: 1,
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     title: "Leo",
//     Year: "2023",
//     genre: "Kids",
//     price: 10.55,
//     stock: 8,
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     title: "Family Switch",
//     Year: "2023",
//     genre: "Comedy",
//     price: 11.45,
//     stock: 15,
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     title: "Reptile",
//     Year: "2023",
//     genre: "Crime",
//     price: 11.45,
//     stock: 0,
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     title: "Killers of the Flower Moon",
//     Year: "2023",
//     genre: "Thriller",
//     price: 14.0,
//     stock: 1,
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

import { moviesList } from "../../data.js";

const tableBody = document.getElementsByTagName("tbody")[0];

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

function displayMovies() {
  const list = getList();

  tableBody.innerHTML = "";

  list.forEach((el, index) => {
    const row = `<tr><td class="table__column--first">${el.title}</td>
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

    tableBody.insertAdjacentHTML("beforeend", row);
  });

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
