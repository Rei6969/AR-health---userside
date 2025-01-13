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
            <div class="front">
            <img src="${monthData.imageUrl}" alt="img" />
            <div class="img-name-container">
              <h1 class="month-year">${capitalizeFirstLetter(
                monthData.month
              )} ${monthData.year}</h1>
                <h1>${monthData.diseaseName}</h1>
              </div>
            </div>
            <div class="back">
              <div class="description-container">
                <h1>Description</h1>
                <p>${monthData.description}</p>
              </div>
              <div class="symptoms-container">
                <h1>Symptoms</h1>
                <ul>${symptomsList}</ul>
              </div>
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

document
  .querySelector(".btn-login")
  .addEventListener("click", () => (window.location.href = "./Login.html"));
document
  .querySelector(".btn-sign-up")
  .addEventListener("click", () => (window.location.href = "./Signup.html"));

fetchDataAndRender();
