<?php
// Establece el tipo de contenido de la respuesta como JSON
header('Content-Type: application/json');

// Define el nombre del archivo donde se almacenan las valoraciones
$archivo = "valoraciones.json";

// Verifica si el archivo de valoraciones existe
if (file_exists($archivo)) {
  // Si existe, lee su contenido y lo convierte de JSON a un array de PHP
  $valoraciones = json_decode(file_get_contents($archivo), true);

  // Convierte nuevamente el array a JSON y lo envía como respuesta
  echo json_encode($valoraciones);
} else {
  // Si el archivo no existe, devuelve un array vacío en formato JSON
  echo json_encode([]);
}
?>
