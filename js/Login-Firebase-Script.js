import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import {
    getAuth,
    signInWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence,
    browserLocalPersistence,
    GoogleAuthProvider,
    signInWithPopup,
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
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("login-inp-email");
    const passwordInput = document.getElementById("login-inp-password");
    const rememberMeCheckbox = document.getElementById("login-inp-remember-me");
    const googleButton = document.getElementById("btn-google");

    document.querySelector(".btn-close").addEventListener("click", () => {
      alertContainer.classList.toggle("active");
    });

    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      login();
    });

    googleButton.addEventListener("click", googleLogin);

    async function login() {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      const persistence = rememberMeCheckbox.checked
        ? browserLocalPersistence
        : browserSessionPersistence;

      try {
        await setPersistence(auth, persistence);

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
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
      } catch (error) {
        let errorMessage = error.message;

        if (errorMessage === "Firebase: Error (auth/invalid-credential).") {
          alertContainer.classList.add("active");
        } else {
          document.querySelector("#error-message").textContent = errorMessage;
          alertContainer.classList.add("active");
        }
      }
    }

    document
      .querySelector(".forgot-password")
      .addEventListener("click", handleResetPassword);

    async function handleResetPassword() {
      const userEmail = prompt("Please enter the email to reset password.");

      try {
        await sendPasswordResetEmail(auth, userEmail);
        alert(`Password reset email sent to ${userEmail}`);
      } catch (error) {
        console.error("Error resetting password: ", error);
        alert(error.message);
      }
    }

    async function googleLogin() {
      const provider = new GoogleAuthProvider();

      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        if (user.emailVerified) {
          alertContainer.classList.remove("active");
          sessionStorage.setItem("isLoggedIn", true);
          window.location.href = "./Dashboard.html";
        } else {
          document.querySelector("#error-message").textContent =
            "Please verify your email before logging in.";
          alertContainer.classList.add("active");
        }
      } catch (error) {
        console.error("Error signing in with Google: ", error);
        document.querySelector("#error-message").textContent = error.message;
        alertContainer.classList.add("active");
      }
    }
  });
