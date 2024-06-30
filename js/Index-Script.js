import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDAHMdNm9q6RENL7Bbk2dsqcAzClHVVB70",
  authDomain: "ar-health-55bdf.firebaseapp.com",
  databaseURL:
    "https://ar-health-55bdf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ar-health-55bdf",
  storageBucket: "ar-health-55bdf.appspot.com",
  messagingSenderId: "299653685010",
  appId: "1:299653685010:web:0234781762639516ea1dcb",
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

const monthOrder = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

async function fetchDataAndRender() {
  const diseaseContainer = document.querySelector(".disease-card-container");
  const dbRef = ref(database, "month-disease");
  const snapshot = await get(dbRef);

  if (snapshot.exists()) {
    const data = snapshot.val();
    const sortedData = monthOrder.map((month) => data[month]).filter(Boolean);

    sortedData.forEach((monthData) => {
      const card = document.createElement("section");
      card.classList.add("disease-card");

      const symptomsList = monthData.symptoms
        .map((symptom) => `<li>${symptom}</li>`)
        .join("");

      card.innerHTML = `
            <h1>${capitalizeFirstLetter(monthData.month)} ${monthData.year}</h1>
            <div class="img-name-container">
              <img src="${monthData.imageUrl}" alt="img" />
              <h1>${monthData.diseaseName}</h1>
            </div>
            <div class="description-container">
              <h1>Description</h1>
              <p>${monthData.description}</p>
            </div>
            <div class="symptoms-container">
              <h1>Symptoms</h1>
              <ul>${symptomsList}</ul>
            </div>
          `;

      diseaseContainer.appendChild(card);
    });
  } else {
    console.log("No data available");
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

fetchDataAndRender();

document.addEventListener("DOMContentLoaded", () => {
  const btnLogin = document.querySelector(".btn-login");
  const btSignup = document.querySelector(".btn-sign-up");

  btnLogin.addEventListener("click", () => {
    window.location.href = "./html/Login.html";
  });

  btSignup.addEventListener("click", () => {
    window.location.href = "./html/Signup.html";
  });
});

document.addEventListener("headerLoaded", () => {
  const logo = document.querySelector(".logo");
  const btnMenu = document.querySelector(".menu-toggle-container");

  logo.src = "./media/CLINIC LOGO/logo.png";
  btnMenu.style.opacity = "0";
});
