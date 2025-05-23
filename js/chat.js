// chat.js
const socket = io("http://localhost:3000"); // Conexión al servidor de WebSocket

const chatBox = document.getElementById('chat-box');
const form = document.getElementById('chat-form');
const msgInput = document.getElementById('msg');
const nombreInput = document.getElementById('nombre');

// Cargar mensajes existentes al cargar la página
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('http://localhost:3000/mensajes');
    const mensajes = await res.json();
    mensajes.forEach(data => {
      const div = document.createElement('div');
      div.innerHTML = `<strong>${data.nombre}:</strong> ${data.mensaje}`;
      chatBox.appendChild(div);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    console.error('Error al cargar mensajes:', err);
  }
});

// Enviar mensaje
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = msgInput.value.trim();
  const nombre = nombreInput.value.trim();
  if (message && nombre) {
    // Solo emitir por socket, no hacer fetch POST
    socket.emit('chatMessage', { nombre, mensaje: message });
    msgInput.value = '';
    msgInput.focus();
  }
});

// Recibir mensaje
socket.on('chatMessage', (data) => {
  // data: { nombre, mensaje }
  const div = document.createElement('div');
  div.innerHTML = `<strong>${data.nombre}:</strong> ${data.mensaje}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
});
