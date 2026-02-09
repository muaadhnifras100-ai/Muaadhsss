document.addEventListener("DOMContentLoaded", function () {

  // BOOK DATA
  const books = [
    {
      title: "Catch-22",
      author: "Joseph Heller",
      genre: "Classic",
      cover: "Picture/classic1.jpg",
      synopsis: "ollows Captain Yossarian, a U.S. Army Air Corps bombardier in Italy who is furious that thousands of people he has never met are trying to kill him",
      series: ["andmark 1961 satirical war novel, followed by the sequel Closing Time (1994)"],
      reviews: [{ reviewer: "kamal", rating: "4/5", comment: "Defining masterpiece of anti-war satire." }]
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Classic",
      cover: "Picture/classic2.jpg",
      synopsis: "a classic coming-of-age story set in the fictional, deeply segregated town of Maycomb, Alabama, during the 1930s Great Depression",
      series: ["Pulitzer Prize-winning coming-of-age novel set in 1930s Alabama, exploring racism, prejudice, and innocence. "],
      reviews: [{ reviewer: "Lina", rating: "4/5", comment: "profoundly exploring racism, injustice" }]
    },
    {
      title: "Let's Pretend This Never Happened: A Mostly True Memoir",
      author: "Jenny Lawson",
      genre: "Comedy",
      cover: "Picture/comedy1.jpg",
      synopsis: "A funny, chaotic memoir about awkward life and mental health.",
      series: ["Her childhood + early adulthood chaos."],
      reviews: [{ reviewer: "Sara", rating: "3/5", comment: "Sharp, chaotic, and unexpectedly heartfelt." }]
    },
    {
      title: "Diary of a Nobody",
      author: "George Grossmith & Weedon Grossmith",
      genre: "Comedy",
      cover: "Picture/comedy2.jpg",
      synopsis: "An overly proud man records his very unimportant life — and thats what makes it funny.",
      series: ["Not part of a series — its a standalone classic."],
      reviews: [{ reviewer: "Sara", rating: "5/5", comment: "Dry and gently funny, with classic British wit." }]
    },
    {
      title: "The Hobby",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      cover: "Picture/fantasy1.jpg",
      synopsis: "A comfort-loving hobbit goes on a dangerous quest and discovers his bravery.",
      series: ["Part of Middle-earth stories (prequel to The Lord of the Rings)."],
      reviews: [{ reviewer: "Sara", rating: "4/5", comment: "Warm, adventurous, and filled with classic magical charm." }]
    },
    {
      title: "Percy Jackson & the Olympians: The Lightning Thief",
      author: "Rick Riordan",
      genre: "Fantasy",
      cover: "Picture/fantasy2.jpg",
      synopsis: "A modern boy with godly powers races to stop a mythological disaster.",
      series: ["Book 1 of the Percy Jackson & the Olympians series."],
      reviews: [{ reviewer: "Sara", rating: "5/5", comment: "Fast, funny, and packed with mythological adventure." }]
    }
  ];

  // GET ELEMENTS (match your explorer.html)
  const grid = document.getElementById("booksGrid");
  const searchInput = document.getElementById("searchInput");
  const genreSelect = document.getElementById("genreSelect");

  const modal = document.getElementById("modalOverlay");
  const closeBtn = document.getElementById("closeModalBtn");
  const modalTitle = document.getElementById("modalTitle");
  const modalSynopsis = document.getElementById("modalSynopsis");
  const modalSeries = document.getElementById("modalSeriesList");
  const modalReviews = document.getElementById("modalReviewsBody");

  // Stop if page IDs are missing
  if (!grid || !searchInput || !genreSelect || !modal || !closeBtn || !modalTitle || !modalSynopsis || !modalSeries || !modalReviews) {
    console.log("Explorer: Some IDs are missing in explorer.html");
    return;
  }

  // SHOW BOOKS
  function showBooks(list) {
    grid.innerHTML = "";

    for (let i = 0; i < list.length; i++) {
      const book = list[i];

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${book.cover}" alt="${book.title}">
        <div class="card-info">
          <div class="card-title">${book.title}</div>
          <div class="card-author">${book.author}</div>
        </div>
      `;

      card.onclick = function () {
        openModal(book);
      };

      grid.appendChild(card);
    }
  }

  // OPEN MODAL
  function openModal(book) {
    modalTitle.textContent = book.title;
    modalSynopsis.textContent = book.synopsis;

    // series
    modalSeries.innerHTML = "";
    if (book.series.length === 0) {
      modalSeries.innerHTML = "<li>No sequels</li>";
    } else {
      for (let i = 0; i < book.series.length; i++) {
        modalSeries.innerHTML += "<li>" + book.series[i] + "</li>";
      }
    }

    // reviews
    modalReviews.innerHTML = "";
    for (let i = 0; i < book.reviews.length; i++) {
      const r = book.reviews[i];
      modalReviews.innerHTML += `
        <tr>
          <td>${r.reviewer}</td>
          <td>${r.rating}</td>
          <td>${r.comment}</td>
        </tr>
      `;
    }

    modal.style.display = "flex";
  }

  // CLOSE MODAL
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (e) {
    if (e.target === modal) modal.style.display = "none";
  };

  // ADD GENRES (simple)
  const genres = ["Fantasy", "Comedy", "Classic"];
  for (let i = 0; i < genres.length; i++) {
    const option = document.createElement("option");
    option.value = genres[i];
    option.textContent = genres[i];
    genreSelect.appendChild(option);
  }

  // FILTER
  function filterBooks() {
    const text = searchInput.value.toLowerCase();
    const genre = genreSelect.value;

    const filtered = [];

    for (let i = 0; i < books.length; i++) {
      const b = books[i];

      const matchText =
        b.title.toLowerCase().includes(text) ||
        b.author.toLowerCase().includes(text);

      const matchGenre = (genre === "all") || (b.genre === genre);

      if (matchText && matchGenre) filtered.push(b);
    }

    showBooks(filtered);
  }

  // EVENTS
  searchInput.onkeyup = filterBooks;
  genreSelect.onchange = filterBooks;

  // FIRST LOAD
  showBooks(books);

});
