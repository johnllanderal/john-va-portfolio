document.getElementById('year').textContent = new Date().getFullYear();

var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- Mobile nav ---- */
var menuToggle = document.querySelector('.menu-toggle');
var tabs = document.querySelector('.tabs');
if (menuToggle && tabs) {
  menuToggle.addEventListener('click', function () {
    var open = tabs.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  tabs.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      tabs.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---- Live support queue animation ---- */
var tickets = [
  'Refund status — Order #4471',
  'Password reset request',
  'Shipping delay follow-up',
  'Upgrade plan question',
  'Billing address update',
  'Feature how-to question',
  'Cancel subscription request',
  'Discount code not applying'
];
var queueList = document.getElementById('queueList');
var queueCount = document.getElementById('queueCount');
var resolvedCount = 0;

function addTicket() {
  if (!queueList) return;
  var text = tickets[Math.floor(Math.random() * tickets.length)];
  var li = document.createElement('li');
  var label = document.createElement('span');
  label.textContent = text;
  var status = document.createElement('span');
  status.textContent = 'In queue';
  li.appendChild(label);
  li.appendChild(status);
  queueList.appendChild(li);

  while (queueList.children.length > 3) {
    queueList.removeChild(queueList.firstChild);
  }

  setTimeout(function () {
    if (!li.isConnected) return;
    li.classList.add('resolved');
    status.textContent = 'Resolved ✓';
    resolvedCount++;
    if (queueCount) queueCount.textContent = resolvedCount;
  }, 1400);
}

if (queueList && !reduceMotion) {
  addTicket();
  setInterval(addTicket, 2600);
} else if (queueList) {
  queueList.innerHTML = '<li class="resolved"><span>Refund status — Order #4471</span><span>Resolved ✓</span></li>';
  if (queueCount) queueCount.textContent = '47';
}

/* ---- Stat count-up ---- */
var statCards = document.querySelectorAll('.stat-card');
function animateStat(card) {
  var target = parseInt(card.getAttribute('data-target'), 10);
  var suffix = card.getAttribute('data-suffix') || '';
  var numEl = card.querySelector('.stat-num');
  card.classList.add('in-view');
  if (reduceMotion) {
    numEl.textContent = target + suffix;
    return;
  }
  var start = 0;
  var duration = 900;
  var startTime = null;
  function step(ts) {
    if (!startTime) startTime = ts;
    var progress = Math.min((ts - startTime) / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    numEl.textContent = Math.round(start + (target - start) * eased) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

if ('IntersectionObserver' in window && statCards.length) {
  var statObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateStat(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  statCards.forEach(function (c) { statObserver.observe(c); });
} else {
  statCards.forEach(animateStat);
}

/* ---- Folder accordion ---- */
var folders = document.querySelectorAll('.folder');
folders.forEach(function (folder) {
  var tab = folder.querySelector('.folder-tab');
  tab.addEventListener('click', function () {
    var isOpen = folder.getAttribute('data-open') === 'true';
    folders.forEach(function (f) {
      f.setAttribute('data-open', 'false');
      f.querySelector('.folder-tab').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      folder.setAttribute('data-open', 'true');
      tab.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ---- Flip cards ---- */
document.querySelectorAll('.flip-card').forEach(function (card) {
  card.addEventListener('click', function () {
    var pressed = card.getAttribute('aria-pressed') === 'true';
    card.setAttribute('aria-pressed', pressed ? 'false' : 'true');
  });
});

/* ---- Toolkit filter chips ---- */
var chips = document.querySelectorAll('.chip');
var toolRows = document.querySelectorAll('.tool-row');
chips.forEach(function (chip) {
  chip.addEventListener('click', function () {
    chips.forEach(function (c) { c.classList.remove('is-active'); });
    chip.classList.add('is-active');
    var filter = chip.getAttribute('data-filter');
    toolRows.forEach(function (row) {
      var match = filter === 'all' || row.getAttribute('data-category') === filter;
      row.classList.toggle('is-hidden', !match);
    });
  });
});

/* ---- Timeline scrollspy ---- */
var timelineItems = document.querySelectorAll('.timeline-item');
if ('IntersectionObserver' in window && timelineItems.length) {
  var timelineObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) entry.target.classList.add('is-active');
    });
  }, { threshold: 0.6 });
  timelineItems.forEach(function (item) { timelineObserver.observe(item); });
}

/* ---- Contact work-order selector ---- */
var workType = document.getElementById('workType');
var emailBtn = document.getElementById('emailBtn');
var whatsappBtn = document.getElementById('whatsappBtn');

var messages = {
  support: {
    subject: 'Customer support help',
    body: "Hi John,\n\nI'm looking for help with customer support for my business. Here's a bit about what I need:\n\n"
  },
  social: {
    subject: 'Social media management',
    body: "Hi John,\n\nI'm looking for help managing social media for my business. Here's a bit about what I need:\n\n"
  },
  pm: {
    subject: 'Project or team coordination',
    body: "Hi John,\n\nI'm looking for help coordinating a project or team. Here's a bit about what I need:\n\n"
  },
  other: {
    subject: "Let's work together",
    body: "Hi John,\n\nHere's what I'm working on and what I need help with:\n\n"
  }
};

function updateContactLinks() {
  if (!workType) return;
  var choice = messages[workType.value] || messages.other;
  emailBtn.href = 'mailto:john.llanderal21@gmail.com?subject=' + encodeURIComponent(choice.subject) + '&body=' + encodeURIComponent(choice.body);
  whatsappBtn.href = 'https://wa.me/639214512028?text=' + encodeURIComponent(choice.body);
}

if (workType) {
  workType.addEventListener('change', updateContactLinks);
  updateContactLinks();
}
