import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getDatabase,
  ref,
  update,
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
  let currentUser;

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      currentUser = user;
      const userRef = ref(database, `users/${user.uid}`);

      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const { name, email, sex } = snapshot.val();

          document.querySelector("#profile-inp-name").value = name || "";
          document.querySelector("#profile-inp-email").value = email || "";
          document.querySelector("#profile-sex").value = sex || "Male";
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }

      document
        .getElementById("profile-form")
        .addEventListener("submit", async (e) => {
          e.preventDefault();

          const name = document.querySelector("#profile-inp-name").value.trim();
          const sex = document.querySelector("#profile-sex").value;
          const newPassword = document.querySelector(
            "#profile-inp-password"
          ).value;
          const confirmPassword = document.querySelector(
            "#profile-inp-cpassword"
          ).value;

          if (newPassword && newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return;
          }

          try {
            const updates = { name, sex };

            await update(ref(database, `users/${currentUser.uid}`), updates);

            if (newPassword) {
              await handlePasswordChange(currentUser, newPassword);
            }

            alert("Profile updated successfully.");
          } catch (error) {
            alert(`Error updating profile: ${error.message}`);
          }
        });
    } else {
      console.warn("No user is logged in.");
    }
  });
});

async function handlePasswordChange(user, newPassword) {
  const passwordPrompt = prompt(
    "Please enter your current password to confirm password change:"
  );
  if (!passwordPrompt) {
    alert("Password change canceled.");
    return;
  }

  const credential = EmailAuthProvider.credential(user.email, passwordPrompt);

  try {
    await reauthenticateWithCredential(user, credential);

    await updatePassword(user, newPassword);
    alert("Password updated successfully.");
  } catch (error) {
    console.error("Error updating password:", error);
    alert(`Error updating password: ${error.message}`);
  }
}
