// Set avatar in header (profile image or initials)
const name = localStorage.getItem("userName");
const email = localStorage.getItem("userEmail");
const profileImage = localStorage.getItem("profileImage");
const avatarElement = document.getElementById("userAvatar");

if (name) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  if (profileImage) {
    avatarElement.style.backgroundImage = `url('${profileImage}')`;
    avatarElement.style.backgroundSize = "cover";
    avatarElement.style.backgroundPosition = "center";
    avatarElement.textContent = "";
  } else {
    avatarElement.innerText = initials;
  }
} else {
  avatarElement.innerText = "NA";
}

// Logout functionality
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "login.html"; 
  });
}


fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("userCards");
    if (!Array.isArray(data) || data.length === 0) {
      container.innerHTML = `<div class="col-12"><div class="alert alert-warning">No user data available.</div></div>`;
      return;
    }

    data.forEach((user) => {
      const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

      const col = document.createElement("div");
      col.className = "col-12 col-sm-6 col-lg-4 col-xl-3 mb-4";
      col.innerHTML = `
        <div class="card h-100 text-center p-3 border-0 shadow-sm" role="button"
             onclick="window.location.href='user-details.html?id=${user.id}'">
          <div class="rounded-circle bg-secondary text-white fw-bold mx-auto d-flex align-items-center justify-content-center mb-3"
               style="width: 70px; height: 70px; font-size: 20px;">
            ${initials}
          </div>
          <h5 class="fw-semibold mb-1">${user.name}</h5>
          <p class="text-muted mb-1">${user.college_branch}</p>
          <p class="text-muted small">${user.college}</p>
        </div>
      `;
      container.appendChild(col);
    });
  })
  .catch((err) => {
    console.error("Error loading user data:", err);
    document.getElementById("userCards").innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger">Failed to load user data.</div>
      </div>
    `;
  });
