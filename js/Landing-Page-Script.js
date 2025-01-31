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

const descriptionSymptomsContainer = document.querySelector(
  ".description-symptoms-container"
);
const overlayContainer = document.querySelector(".container-overlay");
const btnClose = document.querySelector(".close-container");

const descriptionContent = descriptionSymptomsContainer.querySelector(
  ".description-content"
);
const symptomsContent =
  descriptionSymptomsContainer.querySelector(".symptoms-content");
const titleContent =
  descriptionSymptomsContainer.querySelector(".title-content");
const otherInfo = descriptionSymptomsContainer.querySelector(".other-info");
const previewImages =
  descriptionSymptomsContainer.querySelector(".preview-images");
const overlayImg = document.getElementById("overlay-img");

async function fetchDataAndRender() {
  const diseaseContainer = document.querySelector(".disease-card-container");
  const dbRef = ref(database, "month-disease");
  const snapshot = await get(dbRef);

  if (snapshot.exists()) {
    const data = snapshot.val();
    const sortedData = monthOrder.map((month) => data[month]).filter(Boolean);

    sortedData.forEach((monthData) => {
      const symptomsList = monthData.symptoms
        .map((symptom) => `<li>${symptom}</li>`)
        .join("");

      const card = document.createElement("section");
      card.classList.add("disease-card");

      const frontDiv = document.createElement("div");
      frontDiv.classList.add("front");

      const img = document.createElement("img");
      img.src = monthData.imageUrl;
      img.alt = "img";
      frontDiv.appendChild(img);

      const imgNameContainer = document.createElement("div");
      imgNameContainer.classList.add("img-name-container");

      const monthYear = document.createElement("h1");
      monthYear.classList.add("month-year");
      monthYear.textContent = `${capitalizeFirstLetter(monthData.month)} ${
        monthData.year
      }`;
      imgNameContainer.appendChild(monthYear);

      const diseaseName = document.createElement("h1");
      diseaseName.textContent = monthData.diseaseName;
      imgNameContainer.appendChild(diseaseName);

      frontDiv.appendChild(imgNameContainer);
      card.appendChild(frontDiv);

      const backDiv = document.createElement("div");
      backDiv.classList.add("back");

      const descriptionContainer = document.createElement("div");
      descriptionContainer.classList.add("description-container");

      const descriptionTitle = document.createElement("h1");
      descriptionTitle.textContent = "Description";
      descriptionContainer.appendChild(descriptionTitle);

      const description = document.createElement("p");
      description.textContent = monthData.description;
      descriptionContainer.appendChild(description);

      backDiv.appendChild(descriptionContainer);

      const symptomsContainer = document.createElement("div");
      symptomsContainer.classList.add("symptoms-container");

      const btnSeeMore = document.createElement("button");
      btnSeeMore.classList.add("see-more");
      btnSeeMore.textContent = "See more";
      symptomsContainer.appendChild(btnSeeMore);

      backDiv.appendChild(symptomsContainer);
      card.appendChild(backDiv);

      diseaseContainer.appendChild(card);

      btnSeeMore.addEventListener("click", () => {
        descriptionSymptomsContainer.style.display = "flex";
        overlayContainer.style.display = "flex";
        document.body.style.overflow = "hidden";

        descriptionContent.innerHTML = "";
        symptomsContent.innerHTML = "";
        titleContent.innerHTML = "";
        otherInfo.innerHTML = "";
        previewImages.innerHTML = "";

        titleContent.textContent = monthData.diseaseName;
        descriptionContent.textContent = monthData.description;
        symptomsContent.innerHTML = symptomsList;
        otherInfo.textContent = monthData.otherInfo;
        overlayImg.src = monthData.imageUrl;

        monthData.relatedImagesUrls.forEach((imgUrl) => {
          const img = document.createElement("img");
          img.src = imgUrl;
          img.onclick = function () {
            openModal(this);
          };

          previewImages.appendChild(img);
        });
      });
    });
  } else {
    console.log("No data available");
  }
}

btnClose.addEventListener("click", () => {
  descriptionSymptomsContainer.style.display = "none";
  overlayContainer.style.display = "none";
  document.body.style.overflow = "auto";
});

overlayContainer.addEventListener("click", () => {
  descriptionSymptomsContainer.style.display = "none";
  overlayContainer.style.display = "none";
  document.body.style.overflow = "auto";
});

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
