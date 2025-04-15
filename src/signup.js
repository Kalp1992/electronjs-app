const { ipcRenderer } = require("electron");

document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const result = await ipcRenderer.invoke("register-user", {
      fullname,
      email,
      password,
    });

    if (result.success) {
      alert("Registration successful!");
      window.location.href = "index.html";
    } else {
      alert("Registration failed: " + result.message);
    }
  } catch (error) {
    alert("Error during registration: " + error.message);
  }
});

document.getElementById("backToLogin").addEventListener("click", () => {
  window.location.href = "index.html";
});
