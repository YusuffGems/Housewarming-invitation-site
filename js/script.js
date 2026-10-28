(function () {
  "use strict";
  var E = window.EVENT;
  var $ = function (id) { return document.getElementById(id); };

  function setHref(id, url) {
    var el = $(id);
    if (el) el.href = url;
  }

  /* ---------- Links & map ---------- */
  var frame = $("map-frame");
  if (frame) frame.src = E.mapEmbed;
  setHref("btn-directions", "https://www.google.com/maps/search/?api=1&query=" + E.lat + "," + E.lng);
  setHref("btn-call", "tel:" + E.phone);

  /* ---------- Add to Google Calendar ---------- */
  function toCal(d) {
    return new Date(d).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  }
  setHref(
    "btn-calendar",
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=" + encodeURIComponent(E.title + " - " + E.host) +
      "&dates=" + toCal(E.start) + "/" + toCal(E.end) +
      "&details=" + encodeURIComponent("You are cordially invited to bless our new home.") +
      "&location=" + encodeURIComponent(E.address)
  );

  /* ---------- Toast ---------- */
  var toastTimer;
  function toast(msg) {
    var t = $("toast");
    if (!t) return;
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 2200);
  }

  /* ---------- Share ---------- */
  var shareBtn = $("btn-share");
  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      var data = {
        title: E.title + " - " + E.host,
        text: "You are invited to our " + E.title + " on 13 November 2026, 4:30 AM - 6:00 AM.",
        url: location.href
      };
      if (navigator.share) {
        navigator.share(data).catch(function () {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(data.url).then(function () { toast("Link copied"); });
      } else {
        window.open("https://wa.me/?text=" + encodeURIComponent(data.text + " " + data.url), "_blank");
      }
    });
  }

  /* ---------- Countdown ---------- */
  var target = new Date(E.start).getTime();
  var box = $("countdown");

  function pad(n) { return String(n).padStart(2, "0"); }

  function tick() {
    if (!box) return false;
    var diff = target - Date.now();
    if (diff <= 0) { box.hidden = true; return false; }
    var s = Math.floor(diff / 1000);
    $("cd-days").textContent = Math.floor(s / 86400);
    $("cd-hours").textContent = pad(Math.floor((s % 86400) / 3600));
    $("cd-mins").textContent = pad(Math.floor((s % 3600) / 60));
    $("cd-secs").textContent = pad(s % 60);
    box.hidden = false;
    return true;
  }

  if (tick()) {
    var iv = setInterval(function () { if (!tick()) clearInterval(iv); }, 1000);
  }
})();