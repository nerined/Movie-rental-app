import { moviesList } from "../../data.js";

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

function stepUp(id) {
  displayYourMovies();
}

function stepDown(id) {
  displayYourMovies();
}

function displayYourMovies() {
  const list = getMovieList();

  tableBody.innerHTML = "";

  if (list.length !== 0) {
    list.forEach((el, index) => {
      const row = `<tr class="table__row">
  <td class="table__column--first">${el.title}</td>
  <td>${el.genre}</td>
  <td>
    <div class="time__wrapper">
      <button class="time__button time__button--down" data-index=${index}>&lt;</button
      ><input
        type="number"
        min="12"
        max="168"
        value=${12}
        step="12"
        name="number"
        inputmode="numeric" 
        class="time__input"
        data-index=${index}
      /><button class="time__button time__button--up" data-index=${index}>&gt;</button>
    </div>
  </td>
  <td>${el.price}$</td>
  <td>
    <button class="table__button" data-index=${index} data-id=${
        el.imdbID
      }>Remove</button>
  </td>
</tr>
`;
      tableBody.insertAdjacentHTML("beforeend", row);
    });
  }

  document.querySelectorAll(".table__button").forEach(function (button) {
    button.addEventListener("click", function () {
      updateList(button.dataset.id);

      // const objIndex = list.findIndex((obj) => {
      //   return obj.imdbID === button.dataset.index;
      // });

      list.splice(button.dataset.index, 1);
      localStorage.yourMovieList = JSON.stringify(list);
      // moviesList[button.dataset.index].stock--;
      displayYourMovies();
    });
  });

  document.querySelectorAll(".time__input").forEach(function (input) {
    input.addEventListener("change", function () {
      // const message = document.querySelector('#message');
      // const result = document.querySelector('#result');
      // message.addEventListener('input', function () {
      //     result.textContent = this.value;
      // });
    });
  });

  document.querySelectorAll(".time__button").forEach(function (button) {
    button.addEventListener("click", function () {
      button.classList.forEach((el) => {
        if (el === "time__button--up") {
          let input =
            document.querySelectorAll(".time__input")[button.dataset.index];

          input.setAttribute("value", Number(input.value) + 12);
          // list[button.dataset.index].stock--;
          // stepUp(button.dataset.index);
        } else {
          let input =
            document.querySelectorAll(".time__input")[button.dataset.index];

          input.setAttribute("value", Number(input.value) - 12);

          // stepDown(button.dataset.index);
        }
      });
    });
  });
}

displayYourMovies();
