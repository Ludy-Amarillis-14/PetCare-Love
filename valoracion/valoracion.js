let selectedRating = 0; // Variable para almacenar la calificación seleccionada por el usuario

// 👉 Mostrar el modal de valoración al hacer clic en la estrella
document.getElementById("star-rating-btn").addEventListener("click", () => {
  document.getElementById("rating-modal").style.display = "block"; // Muestra el modal de valoración
});

// 👉 Función para cerrar el modal y reiniciar estrellas
function closeModal() {
  document.getElementById("rating-modal").style.display = "none"; // Oculta el modal
  resetStars(); // Reinicia las estrellas seleccionadas
}

// ⭐ Iluminar estrellas al pasar el mouse
function highlightStars(rating) {
  const stars = document.querySelectorAll("#rating-stars span"); // Selecciona todas las estrellas
  stars.forEach((star, index) => {
    star.classList.toggle("hovered", index < rating); // Aplica o quita la clase 'hovered' según la posición
  });
}

// 🔄 Quitar efecto hover cuando se sale del área
function resetHover() {
  const stars = document.querySelectorAll("#rating-stars span"); // Selecciona todas las estrellas
  stars.forEach((star, index) => {
    star.classList.toggle("hovered", index < selectedRating); // Mantiene el efecto solo en las estrellas ya seleccionadas
  });
}

// ✅ Seleccionar una calificación
function setRating(rating) {
  selectedRating = rating; // Guarda la calificación seleccionada
  const stars = document.querySelectorAll("#rating-stars span"); // Selecciona todas las estrellas
  stars.forEach((star, index) => {
    star.classList.toggle("selected", index < rating); // Aplica o quita la clase 'selected'
  });
}

// 📤 Enviar la valoración
function submitRating() {
  const name = document.getElementById("visitor-name").value.trim(); // Obtiene y limpia el nombre
  const comment = document.getElementById("visitor-comment").value.trim(); // Obtiene y limpia el comentario
  const message = document.getElementById("rating-message"); // Elemento donde se muestra el mensaje

  message.classList.remove("success", "error"); // Limpia estilos anteriores

  if (!name) {
    message.style.color = "red"; // Cambia el color del mensaje
    message.textContent = "Por favor ingresa tu nombre."; // Mensaje de error
    message.classList.add("error"); // Aplica clase de error
    return;
  }

  message.style.color = "green"; // Cambia color del mensaje a verde
  message.textContent = "¡Gracias por tu valoración!"; // Mensaje de éxito
  message.classList.add("success"); // Aplica clase de éxito

  saveRatingToHistory(name, selectedRating, comment); // Guarda la valoración

  setTimeout(() => {
    message.textContent = ""; // Limpia mensaje
    message.classList.remove("success", "error"); // Elimina clases
    closeModal(); // Cierra el modal
    document.getElementById("visitor-name").value = ""; // Limpia el campo de nombre
    document.getElementById("visitor-comment").value = ""; // Limpia el campo de comentario
    resetStars(); // Reinicia estrellas
  }, 2000); // Espera 2 segundos
}

// 🧹 Reiniciar las estrellas
function resetStars() {
  selectedRating = 0; // Reinicia la calificación
  const stars = document.querySelectorAll("#rating-stars span"); // Selecciona todas las estrellas
  stars.forEach(star => {
    star.classList.remove("selected", "hovered"); // Quita clases de efecto visual
  });
}

// 💬 Burbuja emergente cada 12s por 4s
setInterval(() => {
  const tooltip = document.getElementById("star-tooltip"); // Selecciona la burbuja
  tooltip.classList.remove("hidden"); // La muestra
  setTimeout(() => {
    tooltip.classList.add("hidden"); // La oculta después de 4 segundos
  }, 4000);
}, 12000); // Se repite cada 12 segundos

// 💾 Guardar valoración
function saveRatingToHistory(name, stars, comment) {
  const history = JSON.parse(localStorage.getItem("ratingHistory")) || []; // Obtiene historial o lo inicia vacío
  const entry = {
    name,
    stars: "★".repeat(stars) + "☆".repeat(5 - stars), // Representación visual de estrellas
    comment: comment || "(Sin comentario)", // Comentario o texto por defecto
    date: new Date().toLocaleString() // Fecha y hora local
  };

  history.unshift(entry); // Agrega al inicio del arreglo
  localStorage.setItem("ratingHistory", JSON.stringify(history.slice(0, 5))); // Guarda solo las 5 más recientes
  displayRatingHistory(); // Actualiza la vista del historial
}

// 🧾 Mostrar historial de valoraciones
function displayRatingHistory() {
  const history = JSON.parse(localStorage.getItem("ratingHistory")) || []; // Carga el historial
  const latestList = document.getElementById("latest-rating"); // Elemento para la última valoración
  const fullList = document.getElementById("history-list"); // Lista completa de valoraciones
  const toggleBtn = document.getElementById("toggle-history"); // Botón de mostrar/ocultar historial
  const historyWrapper = document.getElementById("history-wrapper"); // Contenedor del historial completo

  latestList.innerHTML = ""; // Limpia contenido previo
  fullList.innerHTML = "";

  if (history.length > 0) {
    const latest = document.createElement("li"); // Crea el elemento para la última valoración
    latest.innerHTML = `
      <strong>${history[0].name}</strong> (${history[0].stars})<br>
      <em>${history[0].comment}</em><br>
      <small>${history[0].date}</small>
    `;
    latestList.appendChild(latest); // Lo agrega al DOM
  } else {
    latestList.innerHTML = "<li>No hay valoraciones aún.</li>"; // Mensaje si no hay valoraciones
  }

  const oldRatings = history.slice(1); // Valoraciones anteriores
  if (oldRatings.length > 0) {
    toggleBtn.style.display = "inline-block"; // Muestra el botón de historial
    historyWrapper.style.display = "block"; // 🔥 Muestra el contenedor del historial

    oldRatings.forEach(item => {
      const li = document.createElement("li"); // Crea elemento de lista
      li.innerHTML = `
        <strong>${item.name}</strong> (${item.stars})<br>
        <em>${item.comment}</em><br>
        <small>${item.date}</small>
      `;
      li.style.marginBottom = "10px"; // Espaciado inferior
      fullList.appendChild(li); // Agrega al historial
    });
  } else {
    toggleBtn.style.display = "none"; // Oculta el botón si no hay historial
    historyWrapper.style.display = "none"; // Oculta el historial
  }
}

// 📦 Al cargar la página
const toggleBtn = document.getElementById("toggle-history"); // Botón de mostrar/ocultar
const historyWrapper = document.getElementById("history-wrapper"); // Contenedor
const arrowIcon = document.getElementById("arrow-icon"); // Icono flecha
const toggleText = document.getElementById("toggle-text"); // Texto del botón

toggleBtn.addEventListener("click", () => {
  const isVisible = historyWrapper.style.display === "block"; // Verifica si está visible
  historyWrapper.style.display = isVisible ? "none" : "block"; // Alterna visibilidad

  toggleBtn.classList.toggle("active", !isVisible); // Cambia el estado visual del botón
  toggleText.textContent = isVisible
    ? "Mostrar valoraciones anteriores✅"
    : "Ocultar valoraciones anteriores✅"; // Cambia el texto del botón según el estado
});