import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  get,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import {
  getStorage,
  ref as storageRef,
  deleteObject,
  getDownloadURL,
  uploadBytes,
  listAll,
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

          const tBody = document.querySelector(".requests-tbody");
          tBody.innerHTML = "";

          const MDRef = ref(database, "requests");

          get(MDRef).then((snapshot) => {
            if (snapshot.exists()) {
              const RData = snapshot.val();

              for (const userID in RData) {
                for (const requestID in RData[userID]) {
                  const data = RData[userID][requestID];

                  const tr = document.createElement("tr");

                  const tdType = document.createElement("td");
                  tdType.textContent = `${data.requestValue}`;

                  const tdFilename = document.createElement("td");

                  if (data.status === "Done") {
                    tdFilename.textContent = `${data.filename}`;
                  } else {
                    tdFilename.textContent = "Pending Request";
                  }

                  const tdActions = document.createElement("td");

                  const btnDownload = document.createElement("button");
                  btnDownload.classList.add("btn-download");
                  btnDownload.textContent = "Download";

                  tdActions.appendChild(btnDownload);

                  tr.appendChild(tdType);
                  tr.appendChild(tdFilename);
                  tr.appendChild(tdActions);

                  tBody.appendChild(tr);

                  //   btnDownload.addEventListener("click", () => {
                  //     const fileUrl = data.fileUrl;

                  //     const link = document.createElement("a");
                  //     link.href = fileUrl;
                  //     link.setAttribute("download", `${data.fileName}`);
                  //     link.setAttribute("target", "_blank"); // Open in a new tab if download attribute fails

                  //     document.body.appendChild(link);
                  //     link.click();
                  //     document.body.removeChild(link);
                  //   });

                  btnDownload.addEventListener("click", async () => {
                    const fileName = `Medical-Record-${data.name}`;
                    const fileUrl = data.fileUrl;

                    try {
                      const response = await fetch(fileUrl);
                      if (!response.ok)
                        throw new Error("Network response was not ok");

                      const blob = await response.blob();
                      const url = window.URL.createObjectURL(blob);

                      const link = document.createElement("a");
                      link.href = url;
                      link.download = `${data.fileName}`;

                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);

                      window.URL.revokeObjectURL(url);
                    } catch (error) {
                      console.error("Fetch and download failed:", error);
                      alert("Failed to download the file.");
                    }
                  });
                }
              }
            }
          });
        }
      });
    }
  });
});
