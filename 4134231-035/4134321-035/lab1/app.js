const USER_STORAGE_KEY = "village-water-current-user";
const USER_LIST_KEY = "village-water-users";

const sampleUser = {
  username: "admin",
  password: "1234",
  fullName: "คุณสมชาย ใจดี",
  phone: "081-234-5678",
  address: "หมู่บ้านพฤกษ์ทอง หมู่ 7 ตำบลท่าทราย อำเภอเมือง จังหวัดเชียงใหม่",
  usage: "125 ลิตร/วัน",
  billStatus: "ชำระแล้ว"
};

const savedUsers = JSON.parse(localStorage.getItem(USER_LIST_KEY) || "null");
if (!savedUsers) {
  localStorage.setItem(USER_LIST_KEY, JSON.stringify([sampleUser]));
}

const loginSection = document.getElementById("login-section");
const dashboardSection = document.getElementById("dashboard-section");
const loginForm = document.getElementById("login-form");
const addressForm = document.getElementById("address-form");
const logoutBtn = document.getElementById("logout-btn");
const loginError = document.getElementById("login-error");
const addressSuccess = document.getElementById("address-success");

function getUsers() {
  return JSON.parse(localStorage.getItem(USER_LIST_KEY) || "[]");
}

function saveUsers(users) {
  localStorage.setItem(USER_LIST_KEY, JSON.stringify(users));
}

function showLogin() {
  loginSection.classList.remove("hidden");
  dashboardSection.classList.add("hidden");
  loginError.textContent = "";
  addressSuccess.textContent = "";
}

function showDashboard(user) {
  loginSection.classList.add("hidden");
  dashboardSection.classList.remove("hidden");

  document.getElementById("welcome-name").textContent = `สวัสดี ${user.fullName}`;
  document.getElementById("full-name").textContent = user.fullName;
  document.getElementById("phone-value").textContent = user.phone;
  document.getElementById("status-value").textContent = user.billStatus;
  document.getElementById("address-text").textContent = user.address;
  document.getElementById("address-input").value = user.address;
  document.getElementById("usage-value").textContent = user.usage;
  document.getElementById("bill-value").textContent = user.billStatus;
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const users = getUsers();
  const matchedUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!matchedUser) {
    loginError.textContent = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
    return;
  }

  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(matchedUser));
  showDashboard(matchedUser);
});

addressForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newAddress = document.getElementById("address-input").value.trim();
  const currentUser = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || "null");

  if (!currentUser) {
    return;
  }

  const users = getUsers();
  const targetUser = users.find((user) => user.username === currentUser.username);
  if (targetUser) {
    targetUser.address = newAddress;
    saveUsers(users);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(targetUser));
    document.getElementById("address-text").textContent = newAddress;
    addressSuccess.textContent = "อัปเดตที่อยู่เรียบร้อยแล้ว";
  }
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem(USER_STORAGE_KEY);
  showLogin();
});

const currentUser = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || "null");
if (currentUser) {
  showDashboard(currentUser);
} else {
  showLogin();
}
