document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("feedbackForm");
  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const msgInput = document.getElementById("msgInput");

  const nameErr = document.getElementById("nameErr");
  const emailErr = document.getElementById("emailErr");
  const msgErr = document.getElementById("msgErr");

  const successMsg = document.getElementById("successMsg");

  const KEY = "readifyFeedback";

  if (!form) return;

  function clearErrors() {
    nameErr.textContent = "";
    emailErr.textContent = "";
    msgErr.textContent = "";
    successMsg.textContent = "";
  }

  function validEmail(email) {
    return email.includes("@") && email.includes(".");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // stop refresh

    clearErrors();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = msgInput.value.trim();

    let ok = true;

    if (name === "") {
      nameErr.textContent = "Enter your name.";
      ok = false;
    }

    if (email === "") {
      emailErr.textContent = "Enter your email.";
      ok = false;
    } else if (!validEmail(email)) {
      emailErr.textContent = "Invalid email.";
      ok = false;
    }

    if (message === "") {
      msgErr.textContent = "Enter your message.";
      ok = false;
    }

    if (!ok) return;

    const feedback = {
      name: name,
      email: email,
      message: message,
      date: new Date().toLocaleString()
    };

    const old = localStorage.getItem(KEY);
    const list = old ? JSON.parse(old) : [];

    list.push(feedback);
    localStorage.setItem(KEY, JSON.stringify(list));

    successMsg.textContent = "Feedback saved successfully!";
    form.reset();
  });

});
