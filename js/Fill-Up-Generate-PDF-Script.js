import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  get,
  push,
  update,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
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

        const inpClassification = document.querySelector(".inp-classification");
        const classCourse = document.getElementById("inp-course");
        const classCollege = document.getElementById("inp-college");
        const courseCollege = document.getElementById("courseCollege");

        handleChange();

        function handleChange() {
          if (inpClassification.value === "Student") {
            classCourse.style.display = "block";
            classCollege.style.display = "none";
            courseCollege.innerHTML = "Course";
          } else {
            classCourse.style.display = "none";
            classCollege.style.display = "block";
            courseCollege.innerHTML = "College";
          }
        }

        inpClassification.addEventListener("change", () => {
          handleChange();
        });

        document
          .getElementById("last-form")
          .addEventListener("submit", async (e) => {
            e.preventDefault();

            try {
              const filePath = "./../media/files/Medical-Record.pdf";
              const response = await fetch(filePath);

              if (!response.ok) {
                throw new Error("Failed to fetch PDF file.");
              }

              const pdfBytes = await response.arrayBuffer();

              const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);

              // INPUT FIELDS ==================================================================================================================

              // FIRST =========================================================================================================================
              const inpSurname = document.querySelector(".inp-surname").value;
              const inpGivenName =
                document.querySelector(".inp-given-name").value;
              const inpMiddleName =
                document.querySelector(".inp-middle-name").value;
              const inpAge = document.querySelector(".inp-age").value;
              const inpSex = document.querySelector(".inp-sex").value;
              const inpStatus = document.querySelector(".inp-status").value;
              const inpBirthdate =
                document.querySelector(".inp-birthdate").value;
              const inpCourse = document.getElementById("inp-course").value;
              const inpCollege = document.getElementById("inp-college").value;
              const inpSchoolYear =
                document.querySelector(".inp-school-year").value;
              const inpAddress = document.querySelector(".inp-address").value;
              const inpCellNo = document.querySelector(".inp-cell-no").value;
              const inpMotherName =
                document.querySelector(".inp-mother-name").value;
              const inpFatherName =
                document.querySelector(".inp-father-name").value;
              const inpGuardianName =
                document.querySelector(".inp-guardian-name").value;
              const inpContactPerson = document.querySelector(
                ".inp-contact-person"
              ).value;
              const inpRelationship =
                document.querySelector(".inp-relationship").value;
              const inpContactNo =
                document.querySelector(".inp-contact-no").value;

              // if (
              //   inpSchoolYear !== "" &&
              //   (inpSchoolYear < 1983 ||
              //     inpSchoolYear > new Date().getFullYear())
              // ) {
              //   alert(
              //     "Please enter a valid School Year if applicable, or leave it blank."
              //   );
              //   return;
              // }

              // SECOND ==============================================================================================

              // const checkbox = document.getElementById("").checked;
              // const inp = document.querySelector(".").value;

              const checkboxKnownIllness = document.getElementById(
                "checkbox-known-illness"
              ).checked;
              const inpKnownIllness =
                document.querySelector(".inp-known-illness").value;
              const checkboxHospitalizations = document.getElementById(
                "checkbox-hospitalizations"
              ).checked;
              const inpHospitalizations = document.querySelector(
                ".inp-hospitalizations"
              ).value;
              const checkboxAllergies =
                document.getElementById("checkbox-allergies").checked;
              const inpAllergies =
                document.querySelector(".inp-allergies").value;
              const checkboxChildhoodImmunization = document.getElementById(
                "checkbox-childhood-immunization"
              ).checked;
              const inpChildhoodImmunization = document.querySelector(
                ".inp-childhood-immunization"
              ).value;
              const checkboxPresentImmunization = document.getElementById(
                "checkbox-present-immunization"
              ).checked;
              const inpPresentImmunization = document.querySelector(
                ".inp-present-immunization"
              ).value;
              const checkboxTakingMedicine = document.getElementById(
                "checkbox-taking-medicine"
              ).checked;
              const inpTakingMedicine = document.querySelector(
                ".inp-taking-medicine"
              ).value;
              const checkboxDentalProblems = document.getElementById(
                "checkbox-dental-problems"
              ).checked;
              const inpDentalProblems = document.querySelector(
                ".inp-dental-problems"
              ).value;
              const checkboxPhysician =
                document.getElementById("checkbox-physician").checked;
              const inpPhysician =
                document.querySelector(".inp-physician").value;

              // THIRD ==============================================================================================

              const checkboxAllergy =
                document.getElementById("checkbox-allergy").checked;
              const inpAllergy =
                document.querySelector(".third-inp-allergy").value;
              const checkboxAsthma =
                document.getElementById("checkbox-asthma").checked;
              const inpAsthma =
                document.querySelector(".third-inp-asthma").value;
              const checkboxTB = document.getElementById("checkbox-tb").checked;
              const inpTB = document.querySelector(".third-inp-tb").value;
              const checkboxHypertension = document.getElementById(
                "checkbox-hypertension"
              ).checked;
              const inpHypertension = document.querySelector(
                ".third-inp-hypertension"
              ).value;
              const checkboxHeartDisease = document.getElementById(
                "checkbox-heart-disease"
              ).checked;
              const inpHeartDisease = document.querySelector(
                ".third-inp-heart-disease"
              ).value;
              const checkboxStroke =
                document.getElementById("checkbox-stroke").checked;
              const inpStroke =
                document.querySelector(".third-inp-stroke").value;
              const checkboxDiabetes =
                document.getElementById("checkbox-diabetes").checked;
              const inpDiabetes = document.querySelector(
                ".third-inp-diabetes"
              ).value;
              const checkboxCancer =
                document.getElementById("checkbox-cancer").checked;
              const inpCancer =
                document.querySelector(".third-inp-cancer").value;
              const checkboxLiverDisease = document.getElementById(
                "checkbox-liver-disease"
              ).checked;
              const inpLiverDisease = document.querySelector(
                ".third-inp-liver-disease"
              ).value;
              const checkboxKidneyDisease = document.getElementById(
                "checkbox-kidney-disease"
              ).checked;
              const inpKidneyDisease = document.querySelector(
                ".third-inp-kidney-disease"
              ).value;
              const checkboxBloodDisorder = document.getElementById(
                "checkbox-blood-disorder"
              ).checked;
              const inpBloodDisorder = document.querySelector(
                ".third-inp-blood-disorder"
              ).value;
              const checkboxEpilepsy =
                document.getElementById("checkbox-epilepsy").checked;
              const inpEpilepsy = document.querySelector(
                ".third-inp-epilepsy"
              ).value;
              const checkboxMentalDisorder = document.getElementById(
                "checkbox-mental-disorder"
              ).checked;
              const inpMentalDisorder = document.querySelector(
                ".third-inp-mental-disorder"
              ).value;
              const checkboxOthers =
                document.getElementById("checkbox-others").checked;
              const inpOthers =
                document.querySelector(".third-inp-others").value;

              // FOURTH ==============================================================================================

              const checkboxYesAlcohol = document.getElementById(
                "checkbox-yes-alcohol"
              ).checked;
              const checkboxNoAlcohol = document.getElementById(
                "checkbox-no-alcohol"
              ).checked;
              const inpAlcohol = document.querySelector(
                ".fourth-inp-yes-alcohol"
              ).value;
              const checkboxYesTobacco = document.getElementById(
                "checkbox-yes-tobacco"
              ).checked;
              const checkboxNoTobacco = document.getElementById(
                "checkbox-no-tobacco"
              ).checked;
              const inpTobacco = document.querySelector(
                ".fourth-inp-yes-tobacco"
              ).value;
              const checkboxYesDrug =
                document.getElementById("checkbox-yes-drug").checked;
              const checkboxNoDrug =
                document.getElementById("checkbox-no-drug").checked;
              const inpDrug = document.querySelector(
                ".fourth-inp-yes-drug"
              ).value;

              if (!checkboxYesAlcohol && !checkboxNoAlcohol) {
                alert("Please select either 'Yes' or 'No' for alcohol intake.");
                return;
              }
              if (!checkboxYesTobacco && !checkboxNoTobacco) {
                alert("Please select either 'Yes' or 'No' for Tobacco use.");
                return;
              }
              if (!checkboxYesDrug && !checkboxNoDrug) {
                alert(
                  "Please select either 'Yes' or 'No' for Illicit drug use."
                );
                return;
              }

              const inpMenstrualDate = document.querySelector(
                ".fourth-inp-menstrual-date"
              ).value;

              const checkboxRegular =
                document.getElementById("checkbox-regular").checked;
              const checkboxIrregular =
                document.getElementById("checkbox-irregular").checked;
              const inpMenstrualDuration = document.querySelector(
                ".fourth-inp-menstrual-duration"
              ).value;
              const inpMenstrualPads = document.querySelector(
                ".fourth-inp-menstrual-pads"
              ).value;
              const checkboxDysmenorrheaYes = document.getElementById(
                "checkbox-dysmenorrhea-yes"
              ).checked;
              const checkboxDysmenorrheaNo = document.getElementById(
                "checkbox-dysmenorrhea-no"
              ).checked;
              const checkboxMild =
                document.getElementById("checkbox-mild").checked;
              const checkboxModerate =
                document.getElementById("checkbox-moderate").checked;
              const checkboxSevere =
                document.getElementById("checkbox-severe").checked;
              const inpCheckUp = document.querySelector(
                ".fourth-inp-check-up"
              ).value;
              const checkboxYesBleeding = document.getElementById(
                "checkbox-yes-bleeding"
              ).checked;
              const checkboxNoBleeding = document.getElementById(
                "checkbox-no-bleeding"
              ).checked;
              const inpBleeding = document.querySelector(
                ".fourth-inp-yes-bleeding"
              ).value;
              const checkboxYesPregnancy = document.getElementById(
                "checkbox-yes-pregnancy"
              ).checked;
              const checkboxNoPregnancy = document.getElementById(
                "checkbox-no-pregnancy"
              ).checked;
              const inpPregnancy = document.querySelector(
                ".fourth-inp-yes-pregnancy"
              ).value;
              const checkboxYesChildren = document.getElementById(
                "checkbox-yes-children"
              ).checked;
              const checkboxNoChildren = document.getElementById(
                "checkbox-no-children"
              ).checked;
              const inpChildren = document.querySelector(
                ".fourth-inp-yes-children"
              ).value;

              // INPUT FIELDS END ==============================================================================================

              const form = pdfDoc.getForm();

              // FIRST ==============================================================================================
              form.getTextField("inp-surname").setText(inpSurname);
              form.getTextField("inp-given-name").setText(inpGivenName);
              form.getTextField("inp-middle-name").setText(inpMiddleName);
              form.getTextField("inp-age").setText(inpAge);
              form.getTextField("inp-sex").setText(inpSex);
              form.getTextField("inp-status").setText(inpStatus);
              form.getTextField("inp-birthdate").setText(inpBirthdate);
              form
                .getTextField("inp-course")
                .setText(
                  inpClassification.value === "Student" ? inpCourse : inpCollege
                );
              form.getTextField("inp-school-year").setText(inpSchoolYear);
              form.getTextField("inp-address").setText(inpAddress);
              form.getTextField("inp-cell-no").setText(inpCellNo);
              form.getTextField("inp-mother-name").setText(inpMotherName);
              form.getTextField("inp-father-name").setText(inpFatherName);
              form.getTextField("inp-guardian-name").setText(inpGuardianName);
              form.getTextField("inp-contact-person").setText(inpContactPerson);
              form.getTextField("inp-relationship").setText(inpRelationship);
              form.getTextField("inp-contact-no").setText(inpContactNo);

              // SECOND ==============================================================================================

              form
                .getField("checkbox-known-illness")
                [checkboxKnownIllness ? "check" : "uncheck"]();
              form.getTextField("inp-known-illness").setText(inpKnownIllness);

              form
                .getField("checkbox-hospitalizations")
                [checkboxHospitalizations ? "check" : "uncheck"]();
              form
                .getTextField("inp-hospitalizations")
                .setText(inpHospitalizations);

              form
                .getField("checkbox-allergies")
                [checkboxAllergies ? "check" : "uncheck"]();
              form.getTextField("inp-allergies").setText(inpAllergies);

              form
                .getField("checkbox-childhood-immunization")
                [checkboxChildhoodImmunization ? "check" : "uncheck"]();
              form
                .getTextField("inp-childhood-immunization")
                .setText(inpChildhoodImmunization);

              form
                .getField("checkbox-present-immunization")
                [checkboxPresentImmunization ? "check" : "uncheck"]();
              form
                .getTextField("inp-present-immunization")
                .setText(inpPresentImmunization);

              form
                .getField("checkbox-taking-medicine")
                [checkboxTakingMedicine ? "check" : "uncheck"]();
              form
                .getTextField("inp-taking-medicine")
                .setText(inpTakingMedicine);

              form
                .getField("checkbox-dental-problems")
                [checkboxDentalProblems ? "check" : "uncheck"]();
              form
                .getTextField("inp-dental-problems")
                .setText(inpDentalProblems);

              form
                .getField("checkbox-physician")
                [checkboxPhysician ? "check" : "uncheck"]();
              form.getTextField("inp-physician").setText(inpPhysician);

              // THIRD ==============================================================================================

              form
                .getField("checkbox-allergy")
                [checkboxAllergy ? "check" : "uncheck"]();
              form.getTextField("third-inp-allergy").setText(inpAllergy);

              form
                .getField("checkbox-asthma")
                [checkboxAsthma ? "check" : "uncheck"]();
              form.getTextField("third-inp-asthma").setText(inpAsthma);

              form.getField("checkbox-tb")[checkboxTB ? "check" : "uncheck"]();
              form.getTextField("third-inp-tb").setText(inpTB);

              form
                .getField("checkbox-hypertension")
                [checkboxHypertension ? "check" : "uncheck"]();
              form
                .getTextField("third-inp-hypertension")
                .setText(inpHypertension);

              form
                .getField("checkbox-heart-disease")
                [checkboxHeartDisease ? "check" : "uncheck"]();
              form
                .getTextField("third-inp-heart-disease")
                .setText(inpHeartDisease);

              form
                .getField("checkbox-stroke")
                [checkboxStroke ? "check" : "uncheck"]();
              form.getTextField("third-inp-stroke").setText(inpStroke);

              form
                .getField("checkbox-diabetes")
                [checkboxDiabetes ? "check" : "uncheck"]();
              form.getTextField("third-inp-diabetes").setText(inpDiabetes);

              form
                .getField("checkbox-cancer")
                [checkboxCancer ? "check" : "uncheck"]();
              form.getTextField("third-inp-cancer").setText(inpCancer);

              form
                .getField("checkbox-liver-disease")
                [checkboxLiverDisease ? "check" : "uncheck"]();
              form
                .getTextField("third-inp-liver-disease")
                .setText(inpLiverDisease);

              form
                .getField("checkbox-kidney-disease")
                [checkboxKidneyDisease ? "check" : "uncheck"]();
              form
                .getTextField("third-inp-kidney-disease")
                .setText(inpKidneyDisease);

              form
                .getField("checkbox-blood-disorder")
                [checkboxBloodDisorder ? "check" : "uncheck"]();
              form
                .getTextField("third-inp-blood-disorder")
                .setText(inpBloodDisorder);

              form
                .getField("checkbox-epilepsy")
                [checkboxEpilepsy ? "check" : "uncheck"]();
              form.getTextField("third-inp-epilepsy").setText(inpEpilepsy);

              form
                .getField("checkbox-mental-disorder")
                [checkboxMentalDisorder ? "check" : "uncheck"]();
              form
                .getTextField("third-inp-mental-disorder")
                .setText(inpMentalDisorder);

              form
                .getField("checkbox-others")
                [checkboxOthers ? "check" : "uncheck"]();
              form.getTextField("third-inp-others").setText(inpOthers);

              // FOURTH ==============================================================================================

              form
                .getField("checkbox-yes-alcohol")
                [checkboxYesAlcohol ? "check" : "uncheck"]();
              form
                .getField("checkbox-no-alcohol")
                [checkboxNoAlcohol ? "check" : "uncheck"]();
              form
                .getTextField("fourth-inp-yes-alcohol")
                .setText(checkboxYesAlcohol ? inpAlcohol : "");
              form
                .getField("checkbox-yes-tobacco")
                [checkboxYesTobacco ? "check" : "uncheck"]();
              form
                .getField("checkbox-no-tobacco")
                [checkboxNoTobacco ? "check" : "uncheck"]();
              form
                .getTextField("fourth-inp-yes-tobacco")
                .setText(checkboxYesTobacco ? inpTobacco : "");
              form
                .getField("checkbox-yes-drug")
                [checkboxYesDrug ? "check" : "uncheck"]();
              form
                .getField("checkbox-no-drug")
                [checkboxNoDrug ? "check" : "uncheck"]();
              form
                .getTextField("fourth-inp-yes-drug")
                .setText(checkboxYesDrug ? inpDrug : "");

              form.getTextField("fourth-inp-menstrual-date").setText(
                inpMenstrualDate
                  .split("-")
                  .map((v, i) => (i === 0 ? v : v.padStart(2, "0")))
                  .join("/")
                  .replace(/^(\d{4})\/(\d{2})\/(\d{2})$/, "$2/$3/$1")
              );

              form
                .getField("checkbox-regular")
                [checkboxRegular ? "check" : "uncheck"]();
              form
                .getField("checkbox-irregular")
                [checkboxIrregular ? "check" : "uncheck"]();
              form
                .getTextField("fourth-inp-menstrual-duration")
                .setText(inpMenstrualDuration);
              form
                .getTextField("fourth-inp-menstrual-pads")
                .setText(inpMenstrualPads);
              form
                .getField("checkbox-dysmenorrhea-yes")
                [checkboxDysmenorrheaYes ? "check" : "uncheck"]();
              form
                .getField("checkbox-dysmenorrhea-no")
                [checkboxDysmenorrheaNo ? "check" : "uncheck"]();
              form
                .getField("checkbox-mild")
                [checkboxMild ? "check" : "uncheck"]();
              form
                .getField("checkbox-moderate")
                [checkboxModerate ? "check" : "uncheck"]();
              form
                .getField("checkbox-severe")
                [checkboxSevere ? "check" : "uncheck"]();
              form.getTextField("fourth-inp-check-up").setText(
                inpCheckUp
                  .split("-")
                  .map((v, i) => (i === 0 ? v : v.padStart(2, "0")))
                  .join("/")
                  .replace(/^(\d{4})\/(\d{2})\/(\d{2})$/, "$2/$3/$1")
              );
              form
                .getField("checkbox-yes-bleeding")
                [checkboxYesBleeding ? "check" : "uncheck"]();
              form
                .getField("checkbox-no-bleeding")
                [checkboxNoBleeding ? "check" : "uncheck"]();
              form
                .getTextField("fourth-inp-yes-bleeding")
                .setText(checkboxYesBleeding ? inpBleeding : "");
              form
                .getField("checkbox-yes-pregnancy")
                [checkboxYesPregnancy ? "check" : "uncheck"]();
              form
                .getField("checkbox-no-pregnancy")
                [checkboxNoPregnancy ? "check" : "uncheck"]();
              form
                .getTextField("fourth-inp-yes-pregnancy")
                .setText(checkboxYesPregnancy ? inpPregnancy : "");
              form
                .getField("checkbox-yes-children")
                [checkboxYesChildren ? "check" : "uncheck"]();
              form
                .getField("checkbox-no-children")
                [checkboxNoChildren ? "check" : "uncheck"]();
              form
                .getTextField("fourth-inp-yes-children")
                .setText(checkboxYesChildren ? inpChildren : "");
              //  END ==============================================================================================

              // const nameField = form.getTextField("inp-surname");
              // nameField.setText(inpSurname);

              const modifiedPdfBytes = await pdfDoc.save();
              const blob = new Blob([modifiedPdfBytes], {
                type: "application/pdf",
              });

              const downloadLink = document.createElement("a");
              downloadLink.href = URL.createObjectURL(blob);
              downloadLink.download = `${inpSurname}-Medical-Record.pdf`;
              downloadLink.click();

              const snapshot = await push(ref(database, `medical-records`));
              const key = snapshot.key;
              const name = `${inpSurname}, ${inpGivenName} ${inpMiddleName}`;
              const cc =
                inpClassification.value === "Student" ? inpCourse : inpCollege;

              const fileStorageRef = storageRef(
                storage,
                `medical-records/${
                  inpClassification.value
                }/${cc}/${name}/${key}/${`${inpSurname}-Medical-Record.pdf`}`
              );
              await uploadBytes(fileStorageRef, blob);

              let currentDate = new Date();
              let year = currentDate.getFullYear();
              let month = String(currentDate.getMonth() + 1).padStart(2, "0");
              let day = String(currentDate.getDate()).padStart(2, "0");

              let dateSubmitted = `${month}/${day}/${year}`;

              const userData = {
                name: name,
                email: currentUserData.email,
                dateSubmitted: dateSubmitted,
                fileUrl: await getDownloadURL(fileStorageRef),
                filename: `${inpSurname}-Medical-Record.pdf`,
                key: key,
              };

              await set(
                ref(
                  database,
                  `medical-records/${inpClassification.value}/${cc}/${name}/${key}`
                ),
                userData
              );

              await update(
                ref(
                  database,
                  `medical-records/${inpClassification.value}/${cc}/${name}`
                ),
                {
                  sex: inpSex,
                }
              );
              // await set(ref(database, `medical-records/${key}`), userData);
              localStorage.clear("current-form");
              window.location.href = "./Dashboard.html";
            } catch (error) {
              console.error("Error while generating PDF:", error);
            }
          });
      }
    });
  } else {
    window.location.href = "./../index.html";
  }
});
