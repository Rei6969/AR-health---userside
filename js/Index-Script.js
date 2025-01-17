import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
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
const auth = getAuth(firebaseApp);
const database = getDatabase();

headerSlider();
function headerSlider() {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;
  let currentIndex = 1;
  let sliderInterval;

  // Clone the first and last slides
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[totalSlides - 1].cloneNode(true);

  slider.appendChild(firstClone);
  slider.insertBefore(lastClone, slides[0]);

  function updateSliderPosition() {
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function startSliderInterval() {
    sliderInterval = setInterval(() => {
      currentIndex++;
      updateSliderPosition();
    }, 5000);
  }

  function resetSliderInterval() {
    clearInterval(sliderInterval);
    startSliderInterval();
  }

  slider.addEventListener("transitionend", () => {
    if (currentIndex >= totalSlides + 1) {
      slider.style.transition = "none";
      currentIndex = 1;
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    if (currentIndex <= 0) {
      slider.style.transition = "none";
      currentIndex = totalSlides;
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  });

  document.getElementById("next").addEventListener("click", () => {
    currentIndex++;
    updateSliderPosition();
    resetSliderInterval();
  });

  document.getElementById("prev").addEventListener("click", () => {
    currentIndex--;
    updateSliderPosition();
    resetSliderInterval();
  });

  let startX, endX;

  slider.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX;
  });

  slider.addEventListener("touchmove", (event) => {
    endX = event.touches[0].clientX;
  });

  slider.addEventListener("touchend", () => {
    if (startX > endX + 50) {
      currentIndex++;
    } else if (startX < endX - 50) {
      currentIndex--;
    }
    updateSliderPosition();
    resetSliderInterval();
  });

  startSliderInterval();
}

// CLINIC SLIDER =======================================================================================================================================
clinicSliderHandle();
function clinicSliderHandle() {
  const clinicSlider = document.querySelector(".clinic-slider");
  const clinicSlides = document.querySelectorAll(".clinic-slide");
  const prevButton = document.getElementById("clinic-prev");
  const nextButton = document.getElementById("clinic-next");

  const slideWidth = clinicSlides[0].clientWidth;
  const totalSlides = clinicSlides.length;

  const firstClone = clinicSlides[0].cloneNode(true);
  const secondClone = clinicSlides[1].cloneNode(true);
  const thirdClone = clinicSlides[2].cloneNode(true);
  const lastClone = clinicSlides[totalSlides - 1].cloneNode(true);
  const secondLastClone = clinicSlides[totalSlides - 2].cloneNode(true);
  const thirdLastClone = clinicSlides[totalSlides - 3].cloneNode(true);

  clinicSlider.appendChild(firstClone);
  clinicSlider.appendChild(secondClone);
  clinicSlider.appendChild(thirdClone);
  clinicSlider.insertBefore(lastClone, clinicSlides[0]);
  clinicSlider.insertBefore(secondLastClone, lastClone);
  clinicSlider.insertBefore(thirdLastClone, secondLastClone);

  let clinicCurrentIndex = 3;
  let clinicSliderInterval;

  function clinicUpdateSliderPosition() {
    clinicSlider.style.transition = "transform 0.5s ease-in-out";
    clinicSlider.style.transform = `translateX(-${
      clinicCurrentIndex * 33.33
    }%)`;
  }

  function startClinicSliderInterval() {
    clinicSliderInterval = setInterval(() => {
      clinicCurrentIndex++;
      clinicUpdateSliderPosition();
    }, 3000);
  }

  function resetClinicSliderInterval() {
    clearInterval(clinicSliderInterval);
    startClinicSliderInterval();
  }

  clinicSlider.addEventListener("transitionend", () => {
    if (clinicCurrentIndex >= totalSlides + 3) {
      clinicSlider.style.transition = "none";
      clinicCurrentIndex = 3;
      clinicSlider.style.transform = `translateX(-${
        clinicCurrentIndex * 33.33
      }%)`;
    }
    if (clinicCurrentIndex < 3) {
      clinicSlider.style.transition = "none";
      clinicCurrentIndex = totalSlides + 2;
      clinicSlider.style.transform = `translateX(-${
        clinicCurrentIndex * 33.33
      }%)`;
    }
  });

  prevButton.addEventListener("click", () => {
    clinicCurrentIndex--;
    clinicUpdateSliderPosition();
    resetClinicSliderInterval();
  });

  nextButton.addEventListener("click", () => {
    clinicCurrentIndex++;
    clinicUpdateSliderPosition();
    resetClinicSliderInterval();
  });

  let clinicStartX, clinicEndX;
  clinicSlider.addEventListener("touchstart", (event) => {
    clinicStartX = event.touches[0].clientX;
  });

  clinicSlider.addEventListener("touchmove", (event) => {
    clinicEndX = event.touches[0].clientX;
  });

  clinicSlider.addEventListener("touchend", () => {
    if (clinicStartX > clinicEndX + 50) {
      clinicCurrentIndex++;
    } else if (clinicStartX < clinicEndX - 50) {
      clinicCurrentIndex--;
    }
    clinicUpdateSliderPosition();
    resetClinicSliderInterval();
  });

  startClinicSliderInterval();
}
// CLINIC SLIDER END =======================================================================================================================================

displayAnnouncement();
async function displayAnnouncement() {
  const announcementContainer = document.getElementById("announcement-content");
  announcementContainer.innerHTML = "";

  const snapshot = await get(ref(database, "announcement"));
  const snapshotData = snapshot.val();

  if (!snapshotData) {
    document.getElementById("no-announcement").style.display = "block";
    return;
  }

  document.getElementById("no-announcement").style.display = "none";

  for (const ID in snapshotData) {
    const data = snapshotData[ID];

    const content = document.createElement("div");
    content.classList = "content";
    content.style.backgroundColor = `var(${data.backgroundColor})`;

    const date = document.createElement("p");
    date.classList.add("date");
    date.textContent = data.dateTime;
    date.style.color = `${data.fontColors}`;

    const text = document.createElement("p");
    text.innerHTML = data.inpContent;
    text.style.color = `${data.fontColors}`;

    content.appendChild(date);
    content.appendChild(text);

    announcementContainer.appendChild(content);
  }
}
