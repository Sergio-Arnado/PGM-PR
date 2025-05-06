<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("conectar_db.php");

$query = "SELECT id_protocolo, titulo, fecha_subida, archivo_pdf FROM protocolos ORDER BY fecha_subida DESC";

$result = mysqli_query($enlace, $query);

$protocolos = [];

if ($result) {
    while ($fila = mysqli_fetch_assoc($result)) {
        $protocolos[] = $fila;
    }
    echo json_encode($protocolos);
} else {
    echo json_encode(["success" => false, "message" => "Error al consultar la base de datos"]);
}
?>