async function loadLayout(id, file) {
  const element = document.getElementById(id);
  if (element) {
    try {
      // Determine the base path dynamically
      const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      const basePath = isLocal ? "" : "/Reto-30-dias-de-front";

      // Use absolute paths starting from the root
      const response = await fetch(`${basePath}/layout/${file}`);
      if (!response.ok) throw new Error(`No se pudo cargar el elemento ${file}`);

      const content = await response.text();
      element.innerHTML = content;

      // Adjust relative paths in the loaded content
      if (id === "nav") adjustNavLinks(basePath);
    } catch (error) {
      console.error('Error loading layout:', error);
    }
  }
}

function adjustNavLinks(basePath) {
  const navLinks = document.querySelectorAll("#nav a");
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href && !href.startsWith("http") && !href.startsWith("#")) {
      link.setAttribute("href", `${basePath}/${href}`);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadLayout("nav", "nav.html");
  loadLayout("footer", "footer.html");
});
