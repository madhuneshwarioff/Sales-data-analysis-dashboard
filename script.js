const revealElements = document.querySelectorAll(".reveal");
const themeToggle = document.querySelector("#themeToggle");
const storedTheme = localStorage.getItem("sales-project-theme");

if (storedTheme === "dark") {
  document.body.dataset.theme = storedTheme;
}

const syncThemeLabel = () => {
  if (!themeToggle) {
    return;
  }

  const darkModeOn = document.body.dataset.theme === "dark";
  themeToggle.querySelector(".theme-toggle-label").textContent = darkModeOn ? "Warm Editorial" : "Dark Analytics";
};

syncThemeLabel();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

revealElements.forEach((element) => revealObserver.observe(element));

const statNumbers = document.querySelectorAll(".stat-number");

const animateCounter = (element) => {
  const target = Number(element.dataset.count || 0);
  const duration = 1200;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    element.textContent = Math.floor(progress * target);

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      element.textContent = String(target);
    }
  };

  requestAnimationFrame(tick);
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach((element) => statsObserver.observe(element));

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";

    if (nextTheme === "light") {
      delete document.body.dataset.theme;
      localStorage.removeItem("sales-project-theme");
    } else {
      document.body.dataset.theme = "dark";
      localStorage.setItem("sales-project-theme", "dark");
    }

    syncThemeLabel();
  });
}
