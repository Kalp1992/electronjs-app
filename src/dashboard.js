// Handle search functionality
document
  .querySelector(".search-box input")
  .addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const searchTerm = e.target.value;
      console.log("Searching for:", searchTerm);
      // Add your search logic here
    }
  });

// Handle sidebar navigation
document.querySelectorAll(".sidebar-nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    // Remove active class from all links
    document
      .querySelectorAll(".sidebar-nav a")
      .forEach((l) => l.classList.remove("active"));
    // Add active class to clicked link
    e.target.classList.add("active");
    // Add your navigation logic here
  });
});
