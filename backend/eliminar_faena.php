<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("conectar_db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id_faena'])) {
    echo json_encode(["success" => false, "message" => "ID de faena no proporcionado"]);
    exit;
}

$id_faena = intval($data['id_faena']);

$sql = "DELETE FROM faenas WHERE id_faena = $id_faena";
if (mysqli_query($enlace, $sql)) {
    echo json_encode(["success" => true, "message" => "Faena eliminada correctamente"]);
} else {
    echo json_encode(["success" => false, "message" => "Error al eliminar la faena"]);
}
?>
