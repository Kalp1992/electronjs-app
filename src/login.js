const { ipcRenderer } = require("electron");

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const result = await ipcRenderer.invoke("login-user", {
      email,
      password,
    });

    if (result.success) {
      alert("Login successful!");
      window.location.href = "dashboard.html";
    } else {
      alert("Login failed: " + result.message);
    }
  } catch (error) {
    alert("Error during login: " + error.message);
  }
});
