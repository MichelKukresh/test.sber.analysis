import { dataSheets, tableSheets } from "./utils/api.js";
import { makeConfig } from "./utils/shared/configCharts.js";

// 1 управление активностью кнопок формы
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

// 2 скрипт сделать select как в макете
const selectElement = document.getElementById("serviceSelect");

selectElement.addEventListener("change", function () {
  if (this.value) {
    this.style.color = "#005E7F";
  } else {
    this.style.color = "#7D838A";
  }
});

// 3 клик по кнопке входа
document.getElementById("loginButton").addEventListener("click", function () {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "login1" && password === "pass1") {    
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
    
  }
});

// 4 Обработка выбора сервиса
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

// 5 формирование таблицы
function writeToSheets(table) {
  const dashboardLists = document.getElementById("dashboardLists");
  dashboardLists.innerHTML = ''; 

  table.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = 
      `<div>
        <div style="display:inline-block; width:8px; height:8px; border-radius:50%; background-color:${item.colors};"></div>
        <span>${item.labels}</span>
        <span>${item.values}%</span>
      </div>`
    ;
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

// 6 Скрипт попапа
const openPopupButton = document.getElementById("open-popup");
const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");

const closePopup = () => {
  overlay.style.display = "none";
  popup.style.display = "none";
};

// Функция для открытия попапа
const openPopup = () => {
  overlay.style.display = "block";
  popup.style.display = "block";
};

// Обработчики событий
openPopupButton.addEventListener("click", openPopup);
overlay.addEventListener("click", closePopup);
document.getElementById("popup-close-btn").addEventListener("click", closePopup);
document.getElementById("popup-cancel-btn").addEventListener("click", closePopup);
document.getElementById("popup-log-out-btn").addEventListener("click", () => {
  location.reload(); // Перезагрузка страницы
});
