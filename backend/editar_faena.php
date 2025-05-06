<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("conectar_db.php");

$data = json_decode(file_get_contents("php://input"), true);

$id_faena = $data['id_faena'] ?? null;
$nombre_faena = $data['nombre_faena'] ?? null;
$ubicacion = $data['ubicacion'] ?? null;

if (!$id_faena || !$nombre_faena || !$ubicacion) {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    exit;
}

$query = "UPDATE faenas SET nombre_faena = ?, ubicacion = ? WHERE id_faena = ?";
$stmt = mysqli_prepare($enlace, $query);
mysqli_stmt_bind_param($stmt, "ssi", $nombre_faena, $ubicacion, $id_faena);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["success" => true, "message" => "Faena actualizada correctamente"]);
} else {
    echo json_encode(["success" => false, "message" => "Error al actualizar la faena"]);
}
?>
