(() => {
  // year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // mobile menu
  const toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // close mobile menu on link click
  document.addEventListener("click", (e) => {
    const a = e.target.closest(".nav-links a");
    if (!a) return;
    document.body.classList.remove("nav-open");
    toggle?.setAttribute("aria-expanded", "false");
  });

  // --- Lead magnet form -> Payhip redirect ---
  const form = document.getElementById("sampleForm");
  const msg = document.getElementById("formMsg");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailInput = form.querySelector("#email");
    const email = (emailInput?.value || "").trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

    if (!msg) return;

    if (!ok) {
      msg.textContent = "Kérlek, adj meg egy érvényes email címet.";
      return;
    }

    msg.textContent = "Köszönöm! Átirányítalak…";

    const payhipUrl =
      "https://store.pro-relationship.com/b/parkapcsolatijikingingyenes?email=" +
      encodeURIComponent(email);

    window.location.href = payhipUrl;
  });

  // buy buttons placeholder (ha kell, maradhat)
  document.querySelectorAll("[data-cta]").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Coming soon");
    });
  });

  // --- Cookie banner ---
  const banner = document.getElementById("cookieBanner");
  const btn = document.getElementById("acceptCookiesBtn");

  const hideBanner = () => {
    if (banner) banner.style.display = "none";
  };

  if (localStorage.getItem("cookiesAccepted") === "true") {
    hideBanner();
  }

  btn?.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    hideBanner();
  });
})();
