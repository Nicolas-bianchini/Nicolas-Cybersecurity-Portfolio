(() => {
  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // Mobile nav
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when clicking a link (mobile)
    navMenu.querySelectorAll("a.nav__link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Theme toggle (persist in localStorage)
  const modeToggle = document.getElementById("modeToggle");
  const root = document.documentElement;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") root.setAttribute("data-theme", "dark");

  const updateIcon = () => {
    const icon = modeToggle?.querySelector(".mode__icon");
    if (!icon) return;
    icon.textContent = root.getAttribute("data-theme") === "dark" ? "☀" : "☾";
  };
  updateIcon();

  modeToggle?.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    if (isDark) {
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    } else {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
    updateIcon();
  });
})();
