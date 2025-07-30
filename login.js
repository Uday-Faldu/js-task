document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); 

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (name && email) {
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);

      window.location.href = "dashboard.html";
    } else {
      alert("Please enter both name and email.");
    }
  });
});
