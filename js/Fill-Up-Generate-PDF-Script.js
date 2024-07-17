import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  get,
  remove,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
  listAll,
  deleteObject,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

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
const storage = getStorage(firebaseApp);

auth.onAuthStateChanged((user) => {
  if (user) {
    const userID = user.uid;
    const userRef = ref(database, "users/" + user.uid);

    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const currentUserData = snapshot.val();

        document
          .querySelector(".btn-submit")
          .addEventListener("click", async () => {
            // var input = "testing";
            // var name = "1";

            // const { jsPDF } = window.jspdf;
            // const doc = new jsPDF();

            // doc.setFontSize(10);

            // doc.text(input, 10, 10);
            // doc.text(name, 30, 30);

            // doc.save("test.pdf");

            const fileInput = document.getElementById("fileInput");

            if (!fileInput.files.length) {
              const filePath = "./../media/files/Medical-Record.pdf";
              const fileName = "Medical-Record.pdf";

              const link = document.createElement("a");
              link.href = filePath;
              link.download = fileName;

              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);

              const response = await fetch(filePath);
              const blob = await response.blob();

              const fileStorageRef = storageRef(
                storage,
                `medical-records/${userID}/${fileName}`
              );
              const snapshot = await uploadBytes(fileStorageRef, blob);

              let currentDate = new Date();
              let year = currentDate.getFullYear();
              let month = String(currentDate.getMonth() + 1).padStart(2, "0");
              let day = String(currentDate.getDate()).padStart(2, "0");

              let dateSubmitted = `${month}/${day}/${year}`;

              const userData = {
                name: currentUserData.name,
                email: currentUserData.email,
                dateSubmitted: dateSubmitted,
                fileUrl: await getDownloadURL(fileStorageRef),
              };

              await set(ref(database, `medical-records/${userID}`), userData);
              alert("Medical Record has been submitted.");
              window.location.href = "./Dashboard.html";
            }
          });
      }
    });
  }
});
