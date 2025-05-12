const headers = document.querySelectorAll(".accordion-header");

headers.forEach((header) => {
  header.addEventListener("click", () => {
    const expanded = header.getAttribute("aria-expanded") === "true";
    const body = document.getElementById(header.getAttribute("aria-controls"));

    header.setAttribute("aria-expanded", !expanded);
    body.hidden = expanded;
  });
});
