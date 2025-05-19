
  const questions = [
    {
      question: "¿Cuál es el lenguaje de marcado usado para estructurar páginas web?",
      options: ["CSS", "HTML", "JavaScript", "Python"],
      answer: "HTML"
    },
    {
      question: "¿Qué lenguaje se usa para darle estilo a una web?",
      options: ["HTML", "CSS", "C++", "PHP"],
      answer: "CSS"
    },
    {
      question: "¿Cuál de estos es un lenguaje de programación?",
      options: ["Photoshop", "Illustrator", "JavaScript", "Figma"],
      answer: "JavaScript"
    }
  ];

  const quizContainer = document.getElementById("quizContainer");
  const quizForm = document.getElementById("quizForm");
  const quizResult = document.getElementById("quizResult");

  // Renderizar preguntas
  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.classList.add("question");

    let optionsHTML = q.options.map(opt => `
      <label>
        <input type="radio" name="q${index}" value="${opt}" required />
        ${opt}
      </label>
    `).join("");

    div.innerHTML = `
      <h3>${index + 1}. ${q.question}</h3>
      ${optionsHTML}
    `;
    quizContainer.appendChild(div);
  });

  // Evaluar respuestas
  quizForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let score = 0;

    questions.forEach((q, index) => {
      const selected = quizForm.querySelector(`input[name="q${index}"]:checked`);
      if (selected && selected.value === q.answer) {
        score++;
      }
    });

    quizResult.textContent = `✅ Obtuviste ${score} de ${questions.length} respuestas correctas.`;
  });

