async function loadLayout(id, file) {
  const element = document.getElementById(id);
  if (element) {
    try {
      const response = await fetch(`../layout/${file}`); // Use absolute path
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const content = await response.text();
      element.outerHTML = content;
    }
    catch (error) {
      console.error('Error loading layout:', error);
    }
  }
};
document.addEventListener("DOMContentLoaded", () => {
  loadLayout("nav", "nav.html");
  loadLayout("footer", "footer.html");
});
