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

  var form = document.querySelector("[data-quote-form]");
  if (!form) return;

  var status = document.querySelector("[data-form-status]");
  var waNumber = "243999944572";

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
    var phone = form.querySelector("#telephone");
    var subject = form.querySelector("#sujet");
    var message = form.querySelector("#message");
    var honey = form.querySelector("[data-honey]");
    var valid = true;
    var nameValue = readField(name, 2, 80);
    var phoneValue = String(phone.value || "").trim();
    var subjectValue = readField(subject, 3, 120);
    var messageValue = readField(message, 20, 1000);

    if (!nameValue) valid = false;
    if (!/^[0-9+().\s-]{6,24}$/.test(phoneValue)) {
      setError(phone, "Indiquez un numéro de téléphone valide.");
      valid = false;
    } else {
      setError(phone, "");
    }
    if (!subjectValue) valid = false;
    if (!messageValue) valid = false;
    if (honey && honey.value.trim() !== "") valid = false;

    if (!valid) {
      status.textContent = "Certaines informations sont à corriger avant de continuer.";
      status.classList.add("is-error");
      var firstInvalid = form.querySelector("[aria-invalid='true']");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    var text = [
      "Bonjour BIGWE, je souhaite un échange.",
      "Nom : " + nameValue,
      "Téléphone : " + phoneValue,
      "Sujet : " + subjectValue,
      "Message : " + messageValue
    ].join("\n");
    var url = "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(text);
    var opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) {
      status.textContent = "Le navigateur a bloqué l'ouverture de WhatsApp. Utilisez le bouton WhatsApp de la page.";
      status.classList.add("is-error");
      return;
    }
    status.textContent = "WhatsApp s'ouvre avec votre message. Ce site ne l'enregistre pas.";
    status.classList.add("is-info");
  });
})();
