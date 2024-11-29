import { dataSheets, tableSheets } from "./utils/api.js";
import { makeConfig } from "./utils/shared/configCharts.js";

// управление активностью кнопок формы
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("loginButton");

function toggleButtonState() {
  if (usernameInput.value && passwordInput.value) {
    loginButton.classList.remove("button_disabled");
    loginButton.disabled = false;
  } else {
    loginButton.classList.add("button_disabled");
    loginButton.disabled = true;
  }
}

usernameInput.addEventListener("input", toggleButtonState);
passwordInput.addEventListener("input", toggleButtonState);

// скрипт сделать select как в макете
const selectElement = document.getElementById("serviceSelect");

selectElement.addEventListener("change", function () {
  if (this.value) {
    this.style.color = "#005E7F";
  } else {
    this.style.color = "#7D838A";
  }
});

// клик по кнопке входа
document.getElementById("loginButton").addEventListener("click", function () {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "login1" && password === "pass1") {
    // document.getElementById("loginError").textContent = "";
    document.getElementById("loginError").classList.add("form__error_none");
    

    // спинер
    const loginButton = document.getElementById("loginButton");
    loginButton.innerHTML =
      '<div class="loading"><div class="spinner"></div></div>';
    setTimeout(() => {
      document.getElementById("authorizations").classList.add("section_hidden");
      document
        .getElementById("serviceSelection")
        .classList.remove("section_hidden");
    }, 1000);
  } else {

    document.getElementById("loginError").classList.remove("form__error_none");
    // document.getElementById("loginError").textContent =
    //   "Логин или пароль неверны.";
  }
});

// Обработка выбора сервиса
const serviceSelect = document.getElementById("serviceSelect");
const selectServiceButton = document.getElementById("selectServiceButton");
const loadingMessage = document.getElementById("loadingMessage");

serviceSelect.addEventListener("change", function () {
  selectServiceButton.classList.remove("button_disabled");

  selectServiceButton.disabled = false;
});

selectServiceButton.addEventListener("click", function () {
  loadingMessage.classList.remove("section_hidden");

  document.getElementById("serviceSelection").classList.add("section_hidden");

  setTimeout(function () {
    loadingMessage.classList.add("section_hidden");
    document.getElementById("headerNav").classList.remove("header__nav_none");
    

    loadChart();
  }, 2000);
});

function writeToSheets(table) {
  // Находим элемент по ID
  const dashboardLists = document.getElementById("dashboardLists");

  // Создаем и добавляем элементы <li>
  table.forEach((item) => {
    const li = document.createElement("li");

    // Создаем контейнер для кружка
    const circleContainer = document.createElement("div");

    // Создаем кружочек
    const circle = document.createElement("span");
    circle.style.display = "inline-block";
    circle.style.width = "10px";
    circle.style.height = "10px";
    circle.style.borderRadius = "50%";
    circle.style.backgroundColor = item.colors;

    // Добавляем кружок в контейнер
    circleContainer.appendChild(circle);

    // Создаем процент
    const procent = document.createElement("span");
    procent.textContent = `${item.values}%`;

    // Устанавливаем текст для метки
    const label = document.createElement("span");
    label.textContent = item.labels;
    circleContainer.appendChild(label);

    // Добавляем контейнер с кружком, текст метки и процент в элемент списка
    li.appendChild(circleContainer);
    li.appendChild(procent);

    dashboardLists.appendChild(li);
  });
}

function loadChart() {
  document.getElementById("dashboard").classList.remove("section_hidden");
  const ctx = document.getElementById("chartContainer").getContext("2d");

  // самостоятельно соберем данные в таблицу
  writeToSheets(tableSheets);

  const config = makeConfig(dataSheets, ChartDataLabels);
  const chart = new Chart(ctx, config);
}

// скрипт попапа
const openPopupButton = document.getElementById("open-popup");
const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");
const popupCloseButton = document.getElementById("popup-close-btn");
const popupCancelButton = document.getElementById("popup-cancel-btn");
const popupLogOutButton = document.getElementById("popup-log-out-btn");


// Функция для открытия попапа
function openPopup() {
  overlay.style.display = "block";
  popup.style.display = "block";
}

// Функция для закрытия попапа
function closePopup() {
  overlay.style.display = "none";
  popup.style.display = "none";
}

// Обработчики событий
openPopupButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);
overlay.addEventListener("click", closePopup);
popupCancelButton.addEventListener("click", closePopup);
popupLogOutButton.addEventListener("click", function() {
  location.reload(); // Перезагрузка страницы
});