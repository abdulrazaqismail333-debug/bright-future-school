document.addEventListener("DOMContentLoaded", () => {
  console.log("Welcome to Bright Future School!");

  // =========================
  // LEARN MORE BUTTON
  // =========================
  const learnMoreBtn = document.querySelector(".hero-btn");
  const aboutSection = document.querySelector("#about");

  if (learnMoreBtn && aboutSection) {
    learnMoreBtn.addEventListener("click", (event) => {
      event.preventDefault();

      aboutSection.scrollIntoView({
        behavior: "smooth",
      });
    });
  }

  // =========================
  // MOBILE NAVIGATION
  // =========================
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu",
      );

      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
      });
    });
  }

  // =========================
  // BACK TO TOP
  // =========================
  const topBtn = document.querySelector("#topBtn");

  if (topBtn) {
    const toggleTopButton = () => {
      topBtn.style.display = window.scrollY > 300 ? "block" : "none";
    };

    window.addEventListener("scroll", toggleTopButton);
    toggleTopButton();

    topBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // =========================
  // DARK MODE
  // =========================
  const themeToggle = document.querySelector("#theme-toggle");

  if (themeToggle) {
    let savedTheme = "light";

    try {
      savedTheme = localStorage.getItem("bright-future-theme") || "light";
    } catch (error) {
      console.warn("Theme preference could not be loaded.");
    }

    function applyTheme(theme) {
      const isDark = theme === "dark";

      document.body.classList.toggle("dark-mode", isDark);

      themeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";

      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode",
      );

      themeToggle.setAttribute("aria-pressed", String(isDark));
    }

    applyTheme(savedTheme);

    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark-mode");
      const nextTheme = isDark ? "light" : "dark";

      applyTheme(nextTheme);

      try {
        localStorage.setItem("bright-future-theme", nextTheme);
      } catch (error) {
        console.warn("Theme preference could not be saved.");
      }
    });
  } else {
    console.warn('Dark mode button not found. Check for id="theme-toggle".');
  }

  // =========================
  // SCROLL REVEAL ANIMATIONS
  // =========================
  const animatedSections = document.querySelectorAll(
    ".about, .stats, .courses, .admissions, .gallery, .contact",
  );

  if (!("IntersectionObserver" in window)) {
    animatedSections.forEach((section) => {
      section.classList.add("is-visible");
    });
  } else {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      },
    );

    animatedSections.forEach((section) => {
      section.classList.add("reveal-on-scroll");
      observer.observe(section);
    });
  }
});
