import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
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

document.addEventListener("DOMContentLoaded", () => {
  let userID;
  let currentUserData;

  auth.onAuthStateChanged((user) => {
    if (user) {
      userID = user.uid;

      const userRef = ref(database, "users/" + user.uid);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          currentUserData = snapshot.val();

          const btnSubmit = document.querySelector(".btn-submit");

          btnSubmit.addEventListener("click", () => {
            let currentDate = new Date();
            let year = currentDate.getFullYear();
            let month = String(currentDate.getMonth() + 1).padStart(2, "0");
            let day = String(currentDate.getDate()).padStart(2, "0");

            let dateSubmitted = `${month}/${day}/${year}`;

            const userData = {
              name: currentUserData.name,
              email: currentUserData.email,
              dateSubmitted: dateSubmitted,
            };

            set(ref(database, "medical-records/" + user.uid), userData);
          });
        }
      });
    }
  });
});
