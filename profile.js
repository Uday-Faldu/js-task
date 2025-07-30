const profileAvatar = document.getElementById("profileAvatar");
const profileInitials = document.getElementById("profileInitials");
const avatarEditBtn = document.getElementById("avatarEditBtn");
const avatarImageInput = document.getElementById("avatarImageInput");
const imageInput = document.getElementById("imageUpload");
const previewImage = document.getElementById("previewImage");
const removeBtn = document.getElementById("removeImage");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");

function getInitials(name = "User") {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function updateAvatar(name, imageUrl) {
  if (imageUrl) {
    profileAvatar.src = imageUrl;
    profileAvatar.style.display = "block";
    profileInitials.style.display = "none";
  } else {
    profileAvatar.style.display = "none";
    profileInitials.textContent = getInitials(name);
    profileInitials.style.display = "flex";
  }
}

function loadProfile() {
  const name = localStorage.getItem("userName") || "User Name";
  const email = localStorage.getItem("userEmail") || "user@email.com";

  document.getElementById("profileName").textContent = name;
  document.getElementById("profileEmail").textContent = email;

  updateAvatar(name, null);
}

window.addEventListener("DOMContentLoaded", loadProfile);

document.getElementById("profileForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const userProfile = {};

  formData.forEach((value, key) => {
    if (userProfile[key]) {
      if (Array.isArray(userProfile[key])) {
        userProfile[key].push(value);
      } else {
        userProfile[key] = [userProfile[key], value];
      }
    } else {
      userProfile[key] = value;
    }
  });

  const hobbies = Array.from(
    document.querySelectorAll("input[name='hobbies']:checked")
  ).map((el) => el.value);
  userProfile.hobbies = hobbies;

  const existing = JSON.parse(localStorage.getItem("userProfile")) || {};
  userProfile.profileImage = existing.profileImage || "";

  localStorage.setItem("userProfile", JSON.stringify(userProfile));

  document.getElementById("profileName").textContent =
    userProfile.name || "User";
  document.getElementById("profileEmail").textContent =
    userProfile.email || "user@email.com";

  updateAvatar(userProfile.name, userProfile.profileImage);
  alert("Profile updated!");
});

avatarEditBtn.addEventListener("click", () => avatarImageInput.click());
avatarImageInput.addEventListener("change", handleImageUpload);
imageInput.addEventListener("change", handleImageUpload);

function handleImageUpload(e) {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (ev) {
      const imageUrl = ev.target.result;
      const data = JSON.parse(localStorage.getItem("userProfile")) || {};
      data.profileImage = imageUrl;
      localStorage.setItem("userProfile", JSON.stringify(data));

      updateAvatar(data.name || "User", imageUrl);
      previewImage.src = imageUrl;
      previewImage.style.display = "block";
      removeBtn.style.display = "inline-block";
    };
    reader.readAsDataURL(file);
  }
}

removeBtn.addEventListener("click", () => {
  const data = JSON.parse(localStorage.getItem("userProfile")) || {};
  delete data.profileImage;
  localStorage.setItem("userProfile", JSON.stringify(data));
  previewImage.style.display = "none";
  removeBtn.style.display = "none";
  updateAvatar(data.name || "User", null);
});

document.getElementById("dob")?.addEventListener("change", function () {
  const dob = new Date(this.value);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }
  document.getElementById("age").value = age;
});

document.getElementById("joining")?.addEventListener("change", function () {
  const year = new Date(this.value).getFullYear();
  if (year) document.getElementById("passing").value = year + 4;
});

document.getElementById("previewBtn")?.addEventListener("click", () => {
  const data = JSON.parse(localStorage.getItem("userProfile")) || {};
  alert(JSON.stringify(data, null, 2));
});
