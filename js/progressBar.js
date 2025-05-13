
  const steps = document.querySelectorAll('.step');
  const progressBar = document.getElementById('progress-bar');

  steps.forEach((step, index) => {
    step.addEventListener('click', () => {
      // Toggle estado
      step.classList.toggle('active');

      // Calcular progreso
      const activeCount = document.querySelectorAll('.step.active').length;
      const percent = (activeCount / steps.length) * 100;
      progressBar.style.width = percent + '%';
    });
  });

