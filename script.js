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

  // form demo
  const form = document.getElementById("sampleForm");
  const msg = document.getElementById("formMsg");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email");
    const v = (email?.value || "").trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

    if (!msg) return;
    msg.textContent = ok
      ? "Köszönöm! A kért részletet elküldtem a megadott e-mail címre."
      : "Kérlek, adj meg egy érvényes email címet.";
  });

  // buy buttons placeholder
  document.querySelectorAll("[data-cta]").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Coming soon");
    });
  });

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("sampleForm");
  const msg  = document.getElementById("formMsg");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailInput = form.querySelector("#email");
    const email = emailInput.value.trim();

    if (!email) {
      msg.textContent = "Kérlek add meg az email címed.";
      return;
    }


    msg.textContent = "Ellenőrzés… átirányítás…";

    const payhipUrl =
      "https://store.pro-relationship.com/b/parkapcsolatijikingingyenes?email="+
  encodeURIComponent(email);


    window.location.href = payhipUrl;
  });
});

})();
