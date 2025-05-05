document.addEventListener('DOMContentLoaded', () => {
  const checkNavLoaded = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
      menuToggle.addEventListener('click', () => {
        navList.classList.toggle('visible');
      });
    } else {
      // Retry after a short delay if navigation is not yet loaded
      setTimeout(checkNavLoaded, 100);
    }
  };

  checkNavLoaded();
});
