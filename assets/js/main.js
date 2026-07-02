/* Portfolio interactions + data-driven HTB writeups index.
   Adding a future writeup = one entry in data/writeups.json. */

(function () {
  "use strict";

  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ---- Writeups index ----
  var mount = document.getElementById("writeups");
  if (!mount) return;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function diffClass(d) {
    var k = String(d || "").toLowerCase();
    return ["easy", "medium", "hard", "insane"].indexOf(k) >= 0 ? "diff-" + k : "";
  }
  function osClass(os) {
    var k = String(os || "").toLowerCase();
    return k === "linux" || k === "windows" ? "os-" + k : "";
  }

  function card(w) {
    var retired = w.status === "retired";
    var badge = retired
      ? '<span class="wu-badge open">Public</span>'
      : '<span class="wu-badge lock">🔒 Locked</span>';

    var tags = "";
    if (w.os) tags += '<span class="wu-tag ' + osClass(w.os) + '">' + esc(w.os) + "</span>";
    if (w.difficulty) tags += '<span class="wu-tag ' + diffClass(w.difficulty) + '">' + esc(w.difficulty) + "</span>";
    if (w.kind && w.kind !== "machine") tags += '<span class="wu-tag">' + esc(w.kind) + "</span>";
    if (w.date) tags += '<span class="wu-tag">' + esc(w.date) + "</span>";

    var footer;
    if (retired && w.url) {
      footer = '<a class="wu-link" href="' + esc(w.url) + '" rel="noopener">Read writeup →</a>';
    } else if (retired) {
      footer = '<span class="wu-note">Writeup published -- see repository.</span>';
    } else {
      footer =
        '<span class="wu-solved">Solved</span>' +
        '<div class="wu-note">Full writeup kept private until this machine retires (per HTB policy).</div>';
    }

    return (
      '<article class="wu-card ' + (retired ? "open" : "locked") + '">' +
      '<div class="wu-top"><span class="wu-name">' + esc(w.name) + "</span>" + badge + "</div>" +
      '<div class="wu-tags">' + tags + "</div>" +
      footer +
      "</article>"
    );
  }

  function render(data) {
    var meta = data.meta || {};
    var items = Array.isArray(data.writeups) ? data.writeups : [];

    // Wire the centralized HTB profile URL if provided
    if (meta.htb_profile_url) {
      document.querySelectorAll("[data-htb-profile]").forEach(function (a) {
        a.setAttribute("href", meta.htb_profile_url);
      });
    }

    if (!items.length) {
      mount.innerHTML = '<p class="empty">No writeups listed yet.</p>';
      return;
    }

    // Order: retired (public) first, then active solved, then the rest
    var order = { retired: 0, active: 1, unknown: 2 };
    items.sort(function (a, b) {
      return (order[a.status] ?? 3) - (order[b.status] ?? 3) || String(a.name).localeCompare(b.name);
    });

    mount.innerHTML = items.map(card).join("");
  }

  fetch("data/writeups.json", { cache: "no-cache" })
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then(render)
    .catch(function () {
      mount.innerHTML =
        '<p class="empty">Could not load the writeups index. Browse the ' +
        '<a href="https://github.com/anjanshiva2219/htb-writeups">repository</a> instead.</p>';
    });
})();
