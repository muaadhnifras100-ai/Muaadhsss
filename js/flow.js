document.addEventListener("DOMContentLoaded", function () {

  const bookInput = document.getElementById("bookInput");
  const addBookBtn = document.getElementById("addBookBtn");
  const booksList = document.getElementById("booksList");
  const clearBooksBtn = document.getElementById("clearBooksBtn");
  const countText = document.getElementById("countText");
  const tipText = document.getElementById("tipText");

  // action sounds
  const soundAdd = document.getElementById("soundAdd");
  const soundRemove = document.getElementById("soundRemove");
  const soundClear = document.getElementById("soundClear");

  // ambience controls
  const ambienceSelect = document.getElementById("ambienceSelect");
  const playBtn = document.getElementById("playAmbienceBtn");
  const stopBtn = document.getElementById("stopAmbienceBtn");

  // ambience audios (NOTE: whitenoice spelling matches your ZIP)
  const amb = {
    rain: document.getElementById("amb_rain"),
    fire: document.getElementById("amb_fire"),
    ocean: document.getElementById("amb_ocean"),
    forest: document.getElementById("amb_forest"),
    cafe: document.getElementById("amb_cafe"),
    whitenoice: document.getElementById("amb_whitenoice")
  };

  if (!bookInput || !addBookBtn || !booksList || !clearBooksBtn || !countText) return;

  const KEY = "readifyCompletedBooks";

  const tips = [
    "Read 10 minutes daily — small habits create big results.",
    "Keep your book near your bed to read before sleep.",
    "Choose a book that matches your mood to stay consistent.",
    "Avoid distractions: put your phone away for 15 minutes.",
    "Track progress — it motivates you to continue."
  ];

  function playSound(aud) {
    if (!aud) return;
    aud.currentTime = 0;
    const p = aud.play();
    if (p && typeof p.catch === "function") p.catch(function(){});
  }

  function stopAllAmbience() {
    Object.keys(amb).forEach(function (k) {
      const a = amb[k];
      if (!a) return;
      a.pause();
      a.currentTime = 0;
    });
  }

  function setRandomTip() {
    if (!tipText) return;
    tipText.textContent = tips[Math.floor(Math.random() * tips.length)];
  }

  function getBooks() {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  }

  function saveBooks(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  function todayDate() {
    return new Date().toLocaleDateString();
  }

  function renderBooks() {
    const list = getBooks();
    countText.textContent = list.length;

    if (list.length === 0) {
      booksList.innerHTML = `<p class="flow-empty">No completed books yet.</p>`;
      return;
    }

    booksList.innerHTML = "";

    for (let i = 0; i < list.length; i++) {
      const item = document.createElement("div");
      item.className = "flow-item";
      item.innerHTML = `
        <div>
          <span class="flow-book">${list[i].name}</span>
          <small class="flow-date">Completed: ${list[i].date}</small>
        </div>
        <button class="removeBtn" data-i="${i}">Remove</button>
      `;
      booksList.appendChild(item);
    }

    document.querySelectorAll(".removeBtn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        playSound(soundRemove);

        const index = Number(btn.getAttribute("data-i"));
        const updated = getBooks();
        updated.splice(index, 1);
        saveBooks(updated);
        renderBooks();
      });
    });
  }

  addBookBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const name = bookInput.value.trim();
    if (name === "") return;

    playSound(soundAdd);

    const list = getBooks();
    list.push({ name: name, date: todayDate() });
    saveBooks(list);

    bookInput.value = "";
    setRandomTip();
    renderBooks();
  });

  clearBooksBtn.addEventListener("click", function (e) {
    e.preventDefault();
    playSound(soundClear);

    localStorage.removeItem(KEY);
    renderBooks();
  });

  // ambience buttons (sound plays only after user click -> works in browsers)
  if (playBtn && stopBtn && ambienceSelect) {
    playBtn.addEventListener("click", function (e) {
      e.preventDefault();
      stopAllAmbience();

      const a = amb[ambienceSelect.value];
      if (a) playSound(a);
    });

    stopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      stopAllAmbience();
    });
  }

  setRandomTip();
  renderBooks();
});
