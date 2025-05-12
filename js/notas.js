document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('noteForm');
  const titleInput = document.getElementById('title');
  const contentInput = document.getElementById('content');
  const notesList = document.getElementById('notesList');
  const clearAllBtn = document.getElementById('clearAllBtn');

  let notes = JSON.parse(localStorage.getItem('notas')) || [];
  let editIndex = null;
  let deleteIndex = null;

  // 🧱 Crear diálogo para eliminar una nota
  const deleteDialog = document.createElement('dialog');
  deleteDialog.innerHTML = `
    <p>¿Eliminar esta nota?</p>
    <button id="confirmDelete" class="btn-confirm">Sí</button>
    <button id="cancelDelete" class="btn-confirm">No</button>
  `;
  document.body.appendChild(deleteDialog);
  const confirmDeleteBtn = deleteDialog.querySelector('#confirmDelete');
  const cancelDeleteBtn = deleteDialog.querySelector('#cancelDelete');

  // 🧱 Crear diálogo para eliminar todas
  const clearAllDialog = document.createElement('dialog');
  clearAllDialog.innerHTML = `
    <p>¿Eliminar todas las notas?</p>
    <button id="confirmClearAll" class="btn-confirm">Sí</button>
    <button id="cancelClearAll" class="btn-confirm">No</button>
  `;
  document.body.appendChild(clearAllDialog);
  const confirmClearAllBtn = clearAllDialog.querySelector('#confirmClearAll');
  const cancelClearAllBtn = clearAllDialog.querySelector('#cancelClearAll');

  const saveNotes = () => {
    localStorage.setItem('notas', JSON.stringify(notes));
  };

  const renderNotes = () => {
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
      const noteEl = document.createElement('div');
      noteEl.className = 'note';
      noteEl.innerHTML = `
        <h3>${note.titulo}</h3>
        <p>${note.contenido}</p>
        <div class="note-actions">
          <button onclick="editNote(${index})">✏️ Editar</button>
          <button onclick="confirmDelete(${index})">❌ Eliminar</button>
        </div>
      `;
      notesList.appendChild(noteEl);
    });
  };

  window.editNote = (index) => {
    const note = notes[index];
    titleInput.value = note.titulo;
    contentInput.value = note.contenido;
    editIndex = index;
    titleInput.focus();
  };

  window.confirmDelete = (index) => {
    deleteIndex = index;
    deleteDialog.showModal();
  };

  confirmDeleteBtn.onclick = () => {
    if (deleteIndex !== null) {
      notes.splice(deleteIndex, 1);
      deleteIndex = null;
      saveNotes();
      renderNotes();
    }
    deleteDialog.close();
  };

  cancelDeleteBtn.onclick = () => {
    deleteDialog.close();
    deleteIndex = null;
  };

  clearAllBtn.addEventListener('click', () => {
    clearAllDialog.showModal();
  });

  confirmClearAllBtn.onclick = () => {
    notes = [];
    saveNotes();
    renderNotes();
    clearAllDialog.close();
  };

  cancelClearAllBtn.onclick = () => {
    clearAllDialog.close();
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = titleInput.value.trim();
    const contenido = contentInput.value.trim();
    if (titulo && contenido) {
      if (editIndex !== null) {
        notes[editIndex] = { titulo, contenido };
        editIndex = null;
      } else {
        notes.push({ titulo, contenido });
      }
      saveNotes();
      renderNotes();
      form.reset();
    }
  });

  renderNotes();
});
