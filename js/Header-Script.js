document.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.getElementById("header-container");

  loadHeader();

  function loadHeader() {
    const currentPath = window.location.pathname;
    let headerPath;

    if (currentPath.includes("/html/")) {
      headerPath = "./Header-Content.html";
    } else {
      headerPath = "./html/Header-Content.html";
    }

    fetch(headerPath)
      .then((response) => response.text())
      .then((data) => {
        headerContainer.innerHTML = data;
        document.dispatchEvent(new Event("headerLoaded"));
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  document.addEventListener("headerLoaded", () => {
    const btnMenu = document.querySelector(".menu-toggle-container");
    const mainContainer = document.querySelector("main .main-container");
    const menuContainer = document.querySelector("header .menu-container");
    const menuOverlay = document.querySelector("header .menu-overlay");

    btnMenu.onclick = () => {
      menuToggle();
    };

    menuOverlay.onclick = () => {
      menuToggle();
    };

    const menuToggle = () => {
      btnMenu.classList.toggle("active");
      menuContainer.classList.toggle("active");
      mainContainer.classList.toggle("active");
      menuOverlay.classList.toggle("active");

      const bodyOverflow = document.body;

      if (bodyOverflow.style.overflow === "hidden") {
        bodyOverflow.style.overflow = "";
      } else {
        bodyOverflow.style.overflow = "hidden";
      }
    };

    document
      .querySelector(".btn-change-color")
      .addEventListener("click", () => {
        let root = document.documentElement;
        let currentColor = getComputedStyle(root)
          .getPropertyValue("--color-name")
          .trim();

        if (currentColor === "cream") {
          root.style.setProperty("--color-name", "black");
          root.style.setProperty("--color-main-bg", "rgb(31, 30, 29)");
          root.style.setProperty("--color-sub-bg", "rgb(54, 54, 54)");
          root.style.setProperty("--color-font-1", "rgb(254, 250, 224, 1)");
          root.style.setProperty("--color-font-2", "rgb(36, 36, 36)");
          root.style.setProperty("--color-border-1", "rgb(254, 250, 224, 1)");
        } else {
          root.style.setProperty("--color-name", "cream");
          root.style.setProperty("--color-main-bg", "rgba(254, 250, 224, 1)");
          root.style.setProperty("--color-sub-bg", "rgb(194, 194, 194)");
          root.style.setProperty("--color-font-1", "rgb(36, 36, 36)");
          root.style.setProperty("--color-font-2", "rgb(254, 250, 224, 1)");
          root.style.setProperty("--color-border-1", "rgb(36, 36, 36)");
        }
      });
  });
});
