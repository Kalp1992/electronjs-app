document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Here you can handle the form submission
  console.log("Form submitted:", { username, password });
  // You can add your authentication logic here
});

// Update click handler to navigate to dashboard
document.querySelector(".signUp-button").addEventListener("click", () => {
  window.location.href = "signup.html";
});
document.querySelector(".signin-button").addEventListener("click", () => {
  window.location.href = "login.html";
});
