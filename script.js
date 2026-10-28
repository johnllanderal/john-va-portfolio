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
  var sampleDialog = document.getElementById("sampleDialog");
  var sampleBody = document.getElementById("sampleBody");
  var menuButton = document.getElementById("menuButton");

  [navDialog, caseDialog, sampleDialog].forEach(function (dialog) {
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
     Work sample gallery: filter by category, open a sample in a panel
     ------------------------------------------------------------ */
  var chips = document.querySelectorAll("#samples .chip");
  var cards = document.querySelectorAll(".sample-card");
  var sampleStatus = document.getElementById("sampleStatus");

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var filter = chip.dataset.filter;
      var shown = 0;

      chips.forEach(function (other) {
        var active = other === chip;
        other.classList.toggle("is-active", active);
        other.setAttribute("aria-pressed", String(active));
      });

      cards.forEach(function (card) {
        var match = filter === "all" || card.dataset.group === filter;
        card.hidden = !match;
        if (match) shown += 1;
      });

      if (sampleStatus) sampleStatus.textContent = "Showing " + shown + " samples";
    });
  });

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      var template = document.getElementById("tpl-sample-" + card.dataset.sample);
      if (!template || !sampleDialog || !sampleBody) return;
      sampleBody.replaceChildren(template.content.cloneNode(true));
      sampleDialog.showModal();
    });
  });

  /* ------------------------------------------------------------
     Work samples: accessible tabs. Without JavaScript every sample
     is simply shown in a row (the tab buttons stay hidden).
     ------------------------------------------------------------ */
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".sample-tab"));

  function selectTab(tab, moveFocus) {
    tabs.forEach(function (other) {
      var active = other === tab;
      other.setAttribute("aria-selected", String(active));
      other.tabIndex = active ? 0 : -1;
      document.getElementById(other.getAttribute("aria-controls")).hidden = !active;
    });
    if (moveFocus) tab.focus();
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () { selectTab(tab); });
    tab.addEventListener("keydown", function (event) {
      var next = null;
      if (event.key === "ArrowRight") next = tabs[(index + 1) % tabs.length];
      if (event.key === "ArrowLeft") next = tabs[(index - 1 + tabs.length) % tabs.length];
      if (event.key === "Home") next = tabs[0];
      if (event.key === "End") next = tabs[tabs.length - 1];
      if (next) {
        event.preventDefault();
        selectTab(next, true);
      }
    });
  });

  if (tabs.length) selectTab(tabs[0]);

  /* ------------------------------------------------------------
     Contact: pre-fill the email and WhatsApp message by topic.
     Nothing is sent from the page; the visitor's own email or
     WhatsApp app opens with the draft.
     ------------------------------------------------------------ */
  var EMAIL = "john.llanderal21@gmail.com";
  var WHATSAPP = "639214512028";

  var topics = {
    pm: { subject: "Project management and coordination", need: "project management and coordination" },
    exec: { subject: "Executive and CEO support", need: "executive and CEO support" },
    ops: { subject: "Operations and administrative support", need: "operations and administrative support" },
    support: { subject: "Customer support and e-commerce", need: "customer support or e-commerce support" },
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
