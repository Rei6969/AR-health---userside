document.addEventListener("DOMContentLoaded", () => {
  const firstContainer = document.querySelector(".first-container");
  const secondContainer = document.querySelector(".second-container");
  const thirdContainer = document.querySelector(".third-container");

  const secondContainerSpan = document.querySelector(".second-container span");
  const thirdContainerSpan = document.querySelector(".third-container span");
  const fourthContainerSpan = document.querySelector(".fourth-container span");

  const allForm = document.querySelectorAll(".inp-container");
  const firstForm = document.querySelector(".first-form");
  const secondForm = document.querySelector(".second-form");
  const thirdForm = document.querySelector(".third-form");
  const fourthForm = document.querySelector(".fourth-form");

  const allInput = document.querySelectorAll(".inp-container input");

  const currentForm = localStorage.getItem("current-form");

  allInput.forEach((input) => {
    if (
      input.type === "text" ||
      input.type === "number" ||
      input.type === "date" ||
      input.type === "tel"
    ) {
      input.value = "";
    }
    if (input.type === "checkbox") {
      input.checked = false;
    }
  });

  const RemoveFormDisplay = () => {
    allForm.forEach((form) => {
      form.style.display = "none";
    });
  };

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const HandleFirstForm = () => {
    RemoveFormDisplay();
    firstForm.style.display = "block";
    firstContainer.classList.remove("active");
    secondContainerSpan.classList.remove("active");

    localStorage.setItem("current-form", "first");

    ScrollToTop();
  };

  const HandleSecondForm = () => {
    RemoveFormDisplay();
    secondForm.style.display = "block";
    firstContainer.classList.add("active");
    secondContainerSpan.classList.add("active");

    secondContainer.classList.remove("active");
    thirdContainerSpan.classList.remove("active");

    localStorage.setItem("current-form", "second");

    ScrollToTop();
  };

  const HandleThirdForm = () => {
    RemoveFormDisplay();
    thirdForm.style.display = "block";
    firstContainer.classList.add("active");
    secondContainerSpan.classList.add("active");

    secondContainer.classList.add("active");
    thirdContainerSpan.classList.add("active");

    thirdContainer.classList.remove("active");
    fourthContainerSpan.classList.remove("active");

    localStorage.setItem("current-form", "third");

    ScrollToTop();
  };

  const HandleFourthForm = () => {
    RemoveFormDisplay();
    fourthForm.style.display = "block";
    firstContainer.classList.add("active");
    secondContainerSpan.classList.add("active");

    thirdContainer.classList.add("active");
    fourthContainerSpan.classList.add("active");

    secondContainer.classList.add("active");
    thirdContainerSpan.classList.add("active");

    localStorage.setItem("current-form", "fourth");

    ScrollToTop();
  };

  if (currentForm === "first") {
    HandleFirstForm();
  } else if (currentForm === "second") {
    HandleSecondForm();
  } else if (currentForm === "third") {
    HandleThirdForm();
  } else if (currentForm === "fourth") {
    HandleFourthForm();
  }

  // FORM CHECKBOX
  const secondInputContent = document.querySelectorAll(
    ".second-form .inp-content"
  );
  const thirdInputContent = document.querySelectorAll(
    ".third-form .inp-content"
  );
  // const fourthInputContent = document.querySelectorAll(
  //   ".fourth-form .inp-content"
  // );
  const fourthInputContentFirst = document.querySelectorAll(
    ".fourth-form .fourth-first-container .inp-content"
  );
  const fourthInputContentSecond = document.querySelectorAll(
    ".fourth-form .fourth-second-container .inp-content"
  );

  const HandleCheckbox = (inputCheckbox, formNum) => {
    inputCheckbox.forEach((inputContent) => {
      const checkbox = inputContent.querySelector(`.${formNum}-inp-checkbox`);
      const inpField = inputContent.querySelector(`.${formNum}-inp`);

      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          inpField.style.display = "block";
        } else {
          inpField.style.display = "none";
        }
      });
    });
  };

  const HandleFourthCheckbox = (inputCheckboxFirst, inputCheckboxSecond) => {
    inputCheckboxFirst.forEach((inputContent) => {
      const inpField = inputContent.querySelector(".fourth-inp");
      const checkboxYes = inputContent.querySelector(".fourth-inp-yes");
      const checkboxNo = inputContent.querySelector(".fourth-inp-no");

      checkboxYes.addEventListener("change", () => {
        checkboxNo.checked = false;
        if (checkboxYes.checked) {
          inpField.style.display = "block";
        } else {
          inpField.style.display = "none";
        }
      });

      checkboxNo.addEventListener("change", () => {
        checkboxYes.checked = false;
        inpField.style.display = "none";
      });
    });

    inputCheckboxSecond.forEach((inputContent) => {
      const checkboxFirst = inputContent.querySelector(
        ".fourth-inp-checkbox-first"
      );
      const checkboxSecond = inputContent.querySelector(
        ".fourth-inp-checkbox-second"
      );
      const checkboxThird = inputContent.querySelector(
        ".fourth-inp-checkbox-third"
      );
      const disabled = document.querySelector(".dysmenorrhea-disable");
      const inpField = inputContent.querySelector(".fourth-inp");

      if (checkboxFirst != null) {
        checkboxFirst.addEventListener("change", () => {
          checkboxSecond.checked = false;

          if (inpField != null) {
            if (checkboxFirst.checked === true) {
              inpField.style.display = "block";
            } else {
              inpField.style.display = "none";
            }
          }

          if (checkboxThird != null) {
            checkboxThird.checked = false;
          }

          if (
            checkboxFirst.id === "fourth-inp-dysmenorrhea-yes" &&
            checkboxFirst.checked === true
          ) {
            disabled.style.pointerEvents = "";
            disabled.style.opacity = 1;
          } else if (
            checkboxFirst.id === "fourth-inp-dysmenorrhea-yes" &&
            checkboxFirst.checked === false
          ) {
            disabled.style.pointerEvents = "none";
            disabled.style.opacity = 0.5;
          }
        });

        checkboxSecond.addEventListener("change", () => {
          checkboxFirst.checked = false;

          if (inpField != null) {
            inpField.style.display = "none";
          }

          if (checkboxThird != null) {
            checkboxThird.checked = false;
          }

          if (checkboxSecond.id === "fourth-inp-dysmenorrhea-no") {
            disabled.style.pointerEvents = "none";
            disabled.style.opacity = 0.5;
          }
        });

        if (checkboxThird != null) {
          checkboxThird.addEventListener("change", () => {
            checkboxFirst.checked = false;
            checkboxSecond.checked = false;
          });
        }
      }
    });
  };

  HandleCheckbox(secondInputContent, "second");
  HandleCheckbox(thirdInputContent, "third");
  HandleFourthCheckbox(fourthInputContentFirst, fourthInputContentSecond);
  // FORM CHECKBOX END

  // CLEAR FORM
  const inputFirstForm = document.querySelectorAll(".first-form input");
  const inputSecondForm = document.querySelectorAll(".second-form input");
  const inputThirdForm = document.querySelectorAll(".third-form input");
  const inputFourthForm = document.querySelectorAll(".fourth-form input");

  const HandleClearForm = (form, formNum) => {
    form.forEach((formElement) => {
      if (
        formElement.type === "text" ||
        formElement.type === "number" ||
        formElement.type === "date" ||
        formElement.type === "tel"
      ) {
        formElement.value = "";
      }
      if (formElement.type === "checkbox") {
        formElement.checked = false;

        if (!formElement.classList.contains("no-input")) {
          document.querySelector(
            `.${formNum}-form .${formElement.id}`
          ).style.display = "none";
        }
      }
    });
  };

  document
    .querySelector(".first-form .btn-clear")
    .addEventListener("click", () => HandleClearForm(inputFirstForm, "first"));
  document
    .querySelector(".second-form .btn-clear")
    .addEventListener("click", () =>
      HandleClearForm(inputSecondForm, "second")
    );
  document
    .querySelector(".third-form .btn-clear")
    .addEventListener("click", () => HandleClearForm(inputThirdForm, "third"));
  document
    .querySelector(".fourth-form .btn-clear")
    .addEventListener("click", () =>
      HandleClearForm(inputFourthForm, "fourth")
    );

  // CLEAR FORM END

  // BUTTON CONTAINER
  document
    .querySelector(".first-form .btn-next")
    .addEventListener("click", HandleSecondForm);
  document
    .querySelector(".second-form .btn-next")
    .addEventListener("click", HandleThirdForm);
  document
    .querySelector(".third-form .btn-next")
    .addEventListener("click", HandleFourthForm);

  document
    .querySelector(".second-form .btn-previous")
    .addEventListener("click", HandleFirstForm);
  document
    .querySelector(".third-form .btn-previous")
    .addEventListener("click", HandleSecondForm);
  document
    .querySelector(".fourth-form .btn-previous")
    .addEventListener("click", HandleThirdForm);
  // BUTTON CONTAINER END

  // BUTTON BACK
  const btnBack = document.querySelector(".btn-back");
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      btnBack.style.transform = "translateY(100px)";
    } else {
      btnBack.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });

  btnBack.addEventListener("click", () => {
    window.location.href = "./Dashboard.html";
    localStorage.clear("current-form");
  });
  // BUTTON BACK END
});

document.addEventListener("headerLoaded", () => {
  const btnMenu = document.querySelector(".menu-toggle-container");

  btnMenu.style.pointerEvents = "none";
  btnMenu.style.opacity = 0;
});
