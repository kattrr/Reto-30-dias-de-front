
  const testimonials = [
    {
      name: "John Doe",
      role: "Software Engineer",
      company: "TechCorp",
      testimonial:
        "Este producto cambió completamente nuestra forma de trabajar. ¡Eficiencia incomparable!",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Sophia Lee",
      role: "Data Analyst",
      company: "InsightTech",
      testimonial:
        "La herramienta me ahorra horas de trabajo. Las funciones de análisis son increíbles.",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      name: "Michael Johnson",
      role: "UX Designer",
      company: "DesignPro",
      testimonial:
        "Una herramienta que simplifica tareas complejas. Altamente recomendada.",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Emily Davis",
      role: "Marketing Specialist",
      company: "BrandBoost",
      testimonial:
        "Desde que usamos este servicio, la productividad de nuestro equipo ha mejorado mucho.",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      name: "Daniel Martinez",
      role: "Full-Stack Developer",
      company: "CodeCrafters",
      testimonial:
        "¡La mejor inversión que hemos hecho! El soporte también es muy rápido y útil.",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
  ];

  const track = document.getElementById("track");

  // Duplicamos para efecto infinito
  const visible = testimonials.concat(testimonials);

  visible.forEach((t) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="info">
        <img src="${t.avatar}" alt="${t.name}" />
        <div>
          <h3>${t.name}</h3>
          <p class="role">${t.role} – ${t.company}</p>
        </div>
      </div>
      <p class="text">"${t.testimonial}"</p>
    `;
    track.appendChild(card);
  });

