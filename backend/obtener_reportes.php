<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("conectar_db.php");

$query = "SELECT r.id_reporte, r.titulo, r.fecha_creacion, r.contenido, 
                 u.nombres, u.apellidos, u.id_perfil,
                 f.nombre_faena
          FROM reportes r
          JOIN usuarios u ON r.creado_por = u.id_usuario
          JOIN faenas f ON r.faena_id = f.id_faena
          ORDER BY r.fecha_creacion DESC";

$resultado = mysqli_query($enlace, $query);

$reportes = [];

while ($fila = mysqli_fetch_assoc($resultado)) {
    $reportes[] = $fila;
}

echo json_encode($reportes);
?>