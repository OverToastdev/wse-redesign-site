// Weng Sun Engineering — interactions
(function () {
  "use strict";

  // Mobile nav
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", links.classList.contains("open"));
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  // Reveal on scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // Enquiry form -> WhatsApp (no backend needed for draft site)
  var form = document.getElementById("enquiry-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var lines = [
        "Hi Weng Sun Engineering,",
        "",
        "Name: " + (data.get("name") || "-"),
        "Company: " + (data.get("company") || "-"),
        "Phone: " + (data.get("phone") || "-"),
        "Machine / project type: " + (data.get("machine") || "-"),
        "",
        "Details:",
        data.get("message") || "-"
      ];
      var url = "https://wa.me/60124579130?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
    });
  }

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
