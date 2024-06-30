import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDAHMdNm9q6RENL7Bbk2dsqcAzClHVVB70",
  authDomain: "ar-health-55bdf.firebaseapp.com",
  projectId: "ar-health-55bdf",
  storageBucket: "ar-health-55bdf.appspot.com",
  messagingSenderId: "299653685010",
  appId: "1:299653685010:web:0234781762639516ea1dcb",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

let btnLogout;

document.addEventListener("headerLoaded", () => {
  btnLogout = document.querySelector(".btn-logout");
});
document.addEventListener("DOMContentLoaded", () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      btnLogout.addEventListener("click", () => logout());

      function logout() {
        signOut(auth)
          .then(() => {
            window.location.href = "./../index.html";
            sessionStorage.clear();
            localStorage.clear();
          })
          .catch((error) => {
            const errorMessage = error.message;
            console.error("Sign out error:", errorMessage);
            alert(errorMessage);
          });
      }
    } else {
      alert("Please login first before proceeding here.");
      window.location.href = "./../index.html";
    }
  });
});
