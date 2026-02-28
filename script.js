(() => {

console.log("[js] loaded:", location.href);
console.log("[js] exitOverlay:", document.getElementById("exitOverlay"));
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

/* =========================
   EXIT POPUP – Payhip (FIX + DEBUG)
   ========================= */
(() => {
  "use strict";

  const EXIT_KEY = "pr_exit_popup_closed_until";
  const COOL_DOWN_DAYS = 7;

  function daysFromNow(days) {
    return Date.now() + days * 24 * 60 * 60 * 1000;
  }

  function initExitPopup() {
    const overlay = document.getElementById("exitOverlay");
    if (!overlay) return;

    const modal = overlay.querySelector(".exit-modal");

    function canShow() {
      const until = localStorage.getItem(EXIT_KEY);
      return !until || Date.now() > Number(until);
    }

    function isOpen() {
      return overlay.classList.contains("is-open");
    }

    function openExitPopup() {
      if (!canShow()) return;
      if (isOpen()) return;

      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");

      // opcionális: fókusz a modalra / bezáróra, ha van
      const focusEl =
        overlay.querySelector(".exit-close") ||
        modal ||
        overlay;
      focusEl?.focus?.();
    }

    function closeExitPopup(days = COOL_DOWN_DAYS) {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      localStorage.setItem(EXIT_KEY, String(daysFromNow(days)));
    }

    // Kell az inline onclick miatt (a te HTML-ed ezt hívja)
    window.openExitPopup = openExitPopup;
    window.closeExitPopup = closeExitPopup;

    // Háttérkattintás zár (csak overlay-re, ne a modalra)
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeExitPopup();
    });

    // .exit-close elemek (delegálva) — a closest felfelé keres a DOM-ban
    document.addEventListener("click", (e) => {
      if (e.target.closest(".exit-close")) closeExitPopup();
    }); // closest() [web:1]

    // ESC zár
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeExitPopup();
    });

    // Desktop exit intent
    let desktopTriggered = false;

    document.addEventListener("mouseout", (e) => {
      if (desktopTriggered) return;
      if (!canShow()) return;

      const isDesktop = window.matchMedia("(min-width: 981px)").matches;
      if (!isDesktop) return;

      const leavingTop = e.clientY <= 0;
      const noTarget = !e.relatedTarget && !e.toElement;

      if (leavingTop && noTarget) {
        desktopTriggered = true;
        openExitPopup();
      }
    });

    // Mobil scroll trigger (65%)
    let mobileTriggered = false;

    window.addEventListener(
      "scroll",
      () => {
        if (mobileTriggered) return;
        if (!canShow()) return;

        const isMobile = window.matchMedia("(max-width: 980px)").matches;
        if (!isMobile) return;

        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - window.innerHeight;
        if (scrollable <= 0) return;

        const progress = window.scrollY / scrollable;
        if (progress > 0.65) {
          mobileTriggered = true;
          openExitPopup();
        }
      },
      { passive: true }
    );
  }


  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initExitPopup);
  } else {
    initExitPopup();
  } // readyState [web:16]
})();

})();


