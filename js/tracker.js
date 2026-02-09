document.addEventListener("DOMContentLoaded", function () {
  // ✅ Use the tracker card area first (because footer also has id="message")
  const trackerCard = document.querySelector(".wrap .card") || document;

  const totalEl = document.getElementById("totalPages");
  const readEl = document.getElementById("pagesRead");
  const perDayEl = document.getElementById("pagesPerDay");

  const percentText = document.getElementById("percentText");
  const daysText = document.getElementById("daysText");
  const progressBar = document.getElementById("progressBar");

  // This will pick the tracker message (not footer message)
  const messageEl =
    trackerCard.querySelector("#message") || document.getElementById("message");

  const calcBtn = document.getElementById("calcBtn");
  const saveBtn = document.getElementById("saveBtn");
  const clearBtn = document.getElementById("clearBtn");

  // If tracker elements are not on this page, stop (prevents errors)
  if (!totalEl || !readEl || !perDayEl || !percentText || !daysText || !progressBar || !calcBtn || !saveBtn || !clearBtn) {
    return;
  }

  const KEY = "readify_tracker";

  calcBtn.addEventListener("click", calculate);
  saveBtn.addEventListener("click", saveData);
  clearBtn.addEventListener("click", clearAll);

  loadData(); // load saved on open

  function calculate() {
    const total = Number(totalEl.value);
    const read = Number(readEl.value);
    const perDay = Number(perDayEl.value);

    if (total <= 0) return showMsg("Total pages must be more than 0.");
    if (read < 0) return showMsg("Pages read cannot be negative.");
    if (read > total) return showMsg("Pages read cannot be more than total pages.");
    if (perDay <= 0) return showMsg("Pages per day must be more than 0.");

    const percent = (read / total) * 100;
    const remaining = total - read;
    const days = remaining / perDay;

    percentText.textContent = percent.toFixed(1) + "%";
    daysText.textContent = days.toFixed(1) + " days";

    progressBar.style.width = percent.toFixed(1) + "%";

    showMsg("Calculated ✅");
  }

  function saveData() {
    const data = {
      total: totalEl.value,
      read: readEl.value,
      perDay: perDayEl.value
    };
    localStorage.setItem(KEY, JSON.stringify(data));
    showMsg("Saved ✅ (localStorage)");
  }

  function loadData() {
    const saved = localStorage.getItem(KEY);
    if (!saved) return;

    const data = JSON.parse(saved);
    totalEl.value = data.total || "";
    readEl.value = data.read || "";
    perDayEl.value = data.perDay || "";

    calculate();
    showMsg("Loaded saved progress ✅");
  }

  function clearAll() {
    totalEl.value = "";
    readEl.value = "";
    perDayEl.value = "";

    percentText.textContent = "—";
    daysText.textContent = "—";
    progressBar.style.width = "0%";

    localStorage.removeItem(KEY);
    showMsg("Cleared ✅");
  }

  function showMsg(text) {
    if (messageEl) messageEl.textContent = text;
  }
});
