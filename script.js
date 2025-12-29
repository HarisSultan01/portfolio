function toggleTheme() {
  document.body.classList.toggle("dark");

  const icon = document.getElementById("theme-icon");
  if (document.body.classList.contains("dark")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun"); // show sun in dark mode
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon"); // show moon in light mode
  }
}
