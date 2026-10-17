(function () {
  "use strict";

  /* Footer year (the HTML already contains a sensible fallback) */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------
     Drawers: native <dialog> elements handle focus, Esc, and
     background inertness. We only open them and handle backdrop
     clicks.
     ------------------------------------------------------------ */
  var navDialog = document.getElementById("navDialog");
  var caseDialog = document.getElementById("caseDialog");
  var caseBody = document.getElementById("caseBody");
  var menuButton = document.getElementById("menuButton");

  [navDialog, caseDialog].forEach(function (dialog) {
    if (!dialog) return;
    // The dialog's inner wrapper fills it, so a click whose target is the
    // dialog itself can only be a click on the backdrop.
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });
    dialog.querySelectorAll("[data-close]").forEach(function (button) {
      button.addEventListener("click", function () { dialog.close(); });
    });
  });

  if (menuButton && navDialog) {
    menuButton.addEventListener("click", function () { navDialog.showModal(); });
    navDialog.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { navDialog.close(); });
    });
  }

  document.querySelectorAll(".case-card").forEach(function (card) {
    card.addEventListener("click", function () {
      var template = document.getElementById("case-" + card.dataset.case);
      if (!template || !caseDialog || !caseBody) return;
      caseBody.replaceChildren(template.content.cloneNode(true));
      caseDialog.showModal();
    });
  });

  /* ------------------------------------------------------------
     Toolkit filter
     ------------------------------------------------------------ */
  var chips = document.querySelectorAll(".chip");
  var tools = document.querySelectorAll(".tool");
  var toolStatus = document.getElementById("toolStatus");

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var filter = chip.dataset.filter;
      var shown = 0;

      chips.forEach(function (other) {
        var active = other === chip;
        other.classList.toggle("is-active", active);
        other.setAttribute("aria-pressed", String(active));
      });

      tools.forEach(function (tool) {
        var match = filter === "all" || tool.dataset.category === filter;
        tool.hidden = !match;
        if (match) shown += 1;
      });

      if (toolStatus) toolStatus.textContent = "Showing " + shown + " tools";
    });
  });

  /* ------------------------------------------------------------
     Contact: pre-fill the email and WhatsApp message by topic.
     Nothing is sent from the page; the visitor's own email or
     WhatsApp app opens with the draft.
     ------------------------------------------------------------ */
  var EMAIL = "john.llanderal21@gmail.com";
  var WHATSAPP = "639214512028";

  var topics = {
    support: { subject: "Customer support help", need: "customer support for my business" },
    admin: { subject: "Administrative support", need: "administrative support" },
    social: { subject: "Social media management", need: "managing social media for my business" },
    pm: { subject: "Project or team coordination", need: "coordinating a project or team" },
    other: { subject: "Let's work together", need: "a few tasks I'd like help with" }
  };

  var workType = document.getElementById("workType");
  var emailBtn = document.getElementById("emailBtn");
  var whatsappBtn = document.getElementById("whatsappBtn");

  function updateContactLinks() {
    var topic = topics[workType.value] || topics.other;
    var message = "Hi John,\n\nI'm looking for help with " + topic.need +
      ". Here's a bit about what I need:\n\n";
    emailBtn.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(topic.subject) +
      "&body=" + encodeURIComponent(message);
    whatsappBtn.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(message);
  }

  if (workType && emailBtn && whatsappBtn) {
    workType.addEventListener("change", updateContactLinks);
    updateContactLinks();
  }
})();
