(function () {
  "use strict";

  var header = document.querySelector("[data-header]");
  var toggle = document.querySelector("[data-nav-toggle]");
  var panel = document.getElementById("navMain");

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function setMenu(open) {
    if (!toggle || !panel) return;
    panel.classList.toggle("show", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  }

  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      setMenu(!panel.classList.contains("show"));
    });

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && panel.classList.contains("show")) {
        setMenu(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (!panel.classList.contains("show")) return;
      if (panel.contains(event.target) || toggle.contains(event.target)) return;
      setMenu(false);
    });
  }

  var yearNode = document.querySelector("[data-year]");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  var config = window.SITE_CONFIG || {};

  function safeEmail(value) {
    var email = String(value || "").trim();
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) return "";
    return email;
  }

  function fillChannel(key, value, href) {
    var row = document.querySelector('[data-channel="' + key + '"]');
    var slot = document.querySelector('[data-channel-value="' + key + '"]');
    if (!row || !slot || !value) return false;
    var link = document.createElement("a");
    link.setAttribute("href", href);
    link.textContent = value;
    slot.replaceChildren(link);
    row.hidden = false;
    return true;
  }

  var email = safeEmail(config.email);
  var hasEmail = fillChannel("email", email, "mailto:" + email);
  var missing = document.querySelector("[data-missing-contact]");
  if (missing && hasEmail) {
    missing.hidden = true;
  }

  var form = document.querySelector("[data-contact-form]");
  if (!form) return;

  var status = document.querySelector("[data-form-status]");

  function setError(input, message) {
    var error = document.getElementById(input.id + "-error");
    if (!error) return;
    error.textContent = message;
    if (message) {
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", input.id + "-error");
    } else {
      input.removeAttribute("aria-invalid");
    }
  }

  function readField(input, min, max) {
    var value = String(input.value || "").replace(/\s+/g, " ").trim();
    if (/[<>]/.test(value) || /[\u0000-\u001F\u007F]/.test(value)) {
      setError(input, "Ce champ contient un caractère non accepté.");
      return "";
    }
    if (value.length < min || value.length > max) {
      setError(input, "Saisissez entre " + min + " et " + max + " caractères.");
      return "";
    }
    setError(input, "");
    return value;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!status) return;

    status.textContent = "";
    status.className = "form-status";

    var name = form.querySelector("#nom");
    var mail = form.querySelector("#email");
    var subject = form.querySelector("#sujet");
    var message = form.querySelector("#message");
    var honey = form.querySelector("[data-honey]");
    var valid = true;

    if (!readField(name, 2, 80)) valid = false;

    var mailValue = String(mail.value || "").trim();
    if (!safeEmail(mailValue) || mailValue.length > 120) {
      setError(mail, "Indiquez une adresse e-mail valide.");
      valid = false;
    } else {
      setError(mail, "");
    }

    if (!readField(subject, 3, 120)) valid = false;
    if (!readField(message, 20, 2000)) valid = false;

    if (honey && honey.value.trim() !== "") {
      status.textContent = "Le message n'a pas été envoyé. Ce site est statique : un service externe ou un backend est nécessaire pour transmettre les messages.";
      status.classList.add("is-info");
      return;
    }

    if (!valid) {
      status.textContent = "Certaines informations sont à corriger avant de continuer.";
      status.classList.add("is-error");
      var firstInvalid = form.querySelector("[aria-invalid='true']");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    status.textContent = "Le formulaire est correctement rempli, mais le message n'a pas été envoyé. Ce site est statique : un service externe ou un backend est nécessaire pour transmettre les messages.";
    status.classList.add("is-info");
  });
})();
