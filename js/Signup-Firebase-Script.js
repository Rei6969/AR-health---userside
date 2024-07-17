import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
  sendEmailVerification,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
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

const alertContainer = document.querySelector(".alert-container");
const errorMessage = document.querySelector("#error-message");

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    document.querySelector(".btn-close").addEventListener("click", () => {
      alertContainer.classList.toggle("active");
    });

    // document.querySelector("#btn-signup").addEventListener("click", register);

    document
      .querySelector(".btn-google")
      .addEventListener("click", googleSignUp);

    document.getElementById("signup-form").addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.querySelector("#signup-inp-name").value;
      const email = document.querySelector("#signup-inp-email").value;
      const sex = document.querySelector("#signup-sex").value;
      const password = document.querySelector("#signup-inp-password").value;
      const cpWord = document.querySelector("#signup-inp-cpassword").value;

      if (password !== cpWord) {
        alert("Password and confirm password do not match.");
        return;
      }

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              errorMessage.textContent =
                "Verification email sent. Please check your inbox.";
              alertContainer.style.backgroundColor = "rgb(0, 255, 0)";
              alertContainer.classList.add("active");
            })
            .catch((error) => {
              const catchErrorMessage =
                "Error sending verification email: " + error.message;
              errorMessage.textContent = catchErrorMessage;
              alertContainer.classList.add("active");
            });

          auth.signOut().catch((error) => {
            console.error("Error signing out:", error);
          });

          const user = userCredential.user;
          const userData = {
            name: name,
            email: email,
            sex: sex,
            exploredApp: false,
            isSignup: true,
          };

          set(ref(database, "users/" + user.uid), userData);
        })
        .catch((error) => {
          const catchErrorMessage = error.message;
          if (
            catchErrorMessage === "Firebase: Error (auth/email-already-in-use)."
          ) {
            errorMessage.textContent =
              "Email is already in-use, please use another email.";
          } else {
            errorMessage.textContent = catchErrorMessage;
          }
          alertContainer.style.backgroundColor = "rgb(255, 64, 64)";
          alertContainer.classList.add("active");
        });
    });

    function googleSignUp() {
      const provider = new GoogleAuthProvider();

      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          const userData = {
            name: user.displayName,
            email: user.email,
            exploredApp: false,
            isSignup: true,
          };

          set(ref(database, "users/" + user.uid), userData);

          alert("Signed up successfully with Google.");
          window.location.href = "./Dashboard.html";
        })
        .catch((error) => {
          console.error("Error signing up with Google: ", error);
          alert("Error signing up with Google: " + error.message);
        });
    }
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });
