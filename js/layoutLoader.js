async function loadLayout() {
  const navContainer = document.querySelector("nav");
  const footerContainer = document.querySelector("footer");

  if (navContainer) {
    const navResponse = await fetch("../layout/nav.html");
    const navContent = await navResponse.text();
    navContainer.outerHTML = navContent;
  }

  if (footerContainer) {
    const footerResponse = await fetch("../layout/footer.html");
    const footerContent = await footerResponse.text();
    footerContainer.outerHTML = footerContent;
  }
}

document.addEventListener("DOMContentLoaded", loadLayout);
