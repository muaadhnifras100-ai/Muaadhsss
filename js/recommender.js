
document.addEventListener("DOMContentLoaded", function () {

  const books = [
    { title: "Catch-22", author: "Joseph Heller", genre: "Classic", pages: 453, img: "Picture/classic1.jpg" },
    { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Classic", pages: 281, img: "Picture/classic2.jpg" },
    { title: "Let's Pretend This Never Happened: A Mostly True Memoir", author: "Jenny Lawson", genre: "Comedy", pages: 384, img: "Picture/comedy1.jpg" },
    { title: "Diary of a Nobody", author: "George Grossmith & Weedon Grossmith", genre: "Comedy", pages: 200, img: "Picture/comedy2.jpg" },
    { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", pages: 310, img: "Picture/fantasy1.jpg" },
    { title: "Percy Jackson & the Olympians: The Lightning Thief", author: "Rick Riordan", genre: "Fantasy", pages: 377, img: "Picture/fantasy2.jpg"}
  ];

  const genreSelect = document.getElementById("genreSelect");
  const lengthSelect = document.getElementById("lengthSelect");
  const recommendBtn = document.getElementById("recommendBtn");
  const resultBox = document.getElementById("resultBox");

  // If any element missing, stop (prevents crash)
  if (!genreSelect || !lengthSelect || !recommendBtn || !resultBox) return;

  function lengthType(p) {
    if (p <= 200) return "Short";
    if (p <= 400) return "Medium";
    return "Long";
  }

  recommendBtn.addEventListener("click", function () {
    const g = genreSelect.value;
    const l = lengthSelect.value;

    const filtered = books.filter(function (b) {
      const okGenre = (g === "Any") || (b.genre === g);
      const okLen = (l === "Any") || (lengthType(b.pages) === l);
      return okGenre && okLen;
    });

    if (filtered.length === 0) {
      resultBox.innerHTML = "<p>No books found. Try Any.</p>";
      return;
    }

    const pick = filtered[Math.floor(Math.random() * filtered.length)];

    resultBox.innerHTML = `
      <div class="rec-card">
        <img src="${pick.img}" alt="${pick.title}">
        <div class="rec-text">
          <h2>${pick.title}</h2>
          <p><b>Author:</b> ${pick.author}</p>
          <p><b>Genre:</b> ${pick.genre}</p>
          <p><b>Length:</b> ${lengthType(pick.pages)} (${pick.pages} pages)</p>
        </div>
      </div>
    `;
  });

});
