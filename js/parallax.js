// const parallaxSections = document.querySelectorAll(".parallax");
// const speeds = Array.from(parallaxSections).map(() => 0.4);
// const currentOffsets = Array.from(parallaxSections).map(() => 0);


window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  document.querySelectorAll(".parallax").forEach((section) => {
    const rect = section.getBoundingClientRect();
    const offset = rect.top + scrollY;
    const speed = 0.01;

    const yPos = (scrollY - offset) * speed;
    section.style.backgroundPosition = `center ${yPos}px`;
  });
});
