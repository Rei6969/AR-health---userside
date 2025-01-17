import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  get,
  push,
  child,
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

const requestSelect = document.getElementById("requestSelect");
const requestOthers = document.getElementById("requestOthers");
const btnSubmit = document.querySelector(".btn-submit");

const images = document.querySelectorAll(".img-container img");

let userID;
let currentUserData;

auth.onAuthStateChanged((user) => {
  if (user) {
    userID = user.uid;

    const userRef = ref(database, "users/" + user.uid);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        currentUserData = snapshot.val();

        btnSubmit.addEventListener("click", () => {
          let requestValue;

          if (requestSelect.value === "others") {
            if (
              requestOthers.value === "others" &&
              requestOthers.value === ""
            ) {
              alert("Please fill the field if you choose 'others'.");
            } else {
              requestValue = requestOthers.value;
            }
          } else {
            requestValue = requestSelect.value;
          }

          let currentDate = new Date();
          let year = currentDate.getFullYear();
          let month = String(currentDate.getMonth() + 1).padStart(2, "0");
          let day = String(currentDate.getDate()).padStart(2, "0");

          let dateSubmitted = `${month}-${day}-${year}`;

          const requestsRef = ref(database, "requests");
          const newRequestsRef = push(child(requestsRef, userID));
          const requestsID = newRequestsRef.key;

          const userData = {
            requestID: requestsID,
            userID: userID,
            name: currentUserData.name,
            email: currentUserData.email,
            dateSubmitted: dateSubmitted,
            requestValue: requestValue,
            status: "Pending",
            fileUrl: "",
            requestType: "Clinical Services",
          };

          set(child(requestsRef, `${userID}/${requestsID}`), userData).then(
            () => {
              alert(
                "Your request has been successfully submitted. Please check your email for updates."
              );
            }
          );
        });
      }
    });
  } else {
    // alert("Please login first to proceed here.").then(() => {
    window.location.href = "./../index.html";
    // });
  }
});

requestSelect.value = "";

requestSelect.addEventListener("change", () => {
  if (requestSelect.value === "") {
    document.querySelector(".others-container").style.display = "none";
    btnSubmit.style.cursor = "block";
    btnSubmit.style.removeProperty("pointerEvents");
    btnSubmit.style.removeProperty("opacity");
    images.forEach((img) => (img.style.display = "none"));
  } else if (requestSelect.value === "others") {
    document.querySelector(".others-container").style.display = "block";
    requestOthers.value = "";
    images.forEach((img) => (img.style.display = "none"));
    images.forEach((img) => {
      if (img.getAttribute("data-value") === requestSelect.value) {
        img.style.display = "block";
      } else {
        img.style.display = "none";
      }
    });
    requestOthers.addEventListener("input", () => {
      if (requestOthers.value === "") {
        btnSubmit.style.removeProperty("pointerEvents");
        btnSubmit.style.removeProperty("opacity");
      } else {
        btnSubmit.style.pointerEvents = "auto";
        btnSubmit.style.opacity = "1";
      }
    });
  } else {
    document.querySelector(".others-container").style.display = "none";
    btnSubmit.style.pointerEvents = "auto";
    btnSubmit.style.opacity = "1";
    images.forEach((img) => {
      if (img.getAttribute("data-value") === requestSelect.value) {
        img.style.display = "block";
      } else {
        img.style.display = "none";
      }
    });
  }
});

document.addEventListener("headerLoaded", () => {
  const btnMenu = document.querySelector(".menu-toggle-container");

  btnMenu.style.pointerEvents = "none";
  btnMenu.style.opacity = 0;
});

document.querySelector(".btn-back").addEventListener("click", () => {
  window.location.href = "./Dashboard.html";
});
