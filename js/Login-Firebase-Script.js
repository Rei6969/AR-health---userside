import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

document.addEventListener("DOMContentLoaded", () => {
  const alertContainer = document.querySelector(".alert-container");

  document.querySelector(".btn-close").addEventListener("click", () => {
    alertContainer.classList.toggle("active");
  });

  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      const loginForm = document.getElementById("login-form");
      const emailInput = document.getElementById("login-inp-email");
      const passwordInput = document.getElementById("login-inp-password");

      loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        login();
      });

      function login() {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            if (user.emailVerified) {
              alertContainer.classList.remove("active");
              sessionStorage.setItem("isLoggedIn", true);
              window.location.href = "./Dashboard.html";
            } else {
              document.querySelector("#error-message").textContent =
                "Please verify your email before logging in.";
              alertContainer.classList.add("active");
            }
          })
          .catch((error) => {
            let errorMessage = error.message;

            if (errorMessage === "Firebase: Error (auth/invalid-credential).") {
              alertContainer.classList.add("active");
            } else {
              document.querySelector("#error-message").textContent =
                errorMessage;
              alertContainer.classList.add("active");
            }
          });
      }
    })
    .catch((error) => {
      console.error("Error setting persistence:", error);
    });
});
