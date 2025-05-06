<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("conectar_db.php");

// Consulta completa de faenas
$query = "SELECT id_faena, nombre_faena, ubicacion, descripcion, empresa_id FROM faenas";
$resultado = mysqli_query($enlace, $query);

$faenas = [];

while ($fila = mysqli_fetch_assoc($resultado)) {
    $faenas[] = $fila;
}

echo json_encode($faenas);
?>
