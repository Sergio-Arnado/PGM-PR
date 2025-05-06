<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("conectar_db.php");

$data = json_decode(file_get_contents("php://input"));
$rut = mysqli_real_escape_string($enlace, $data->rut);

$query = "DELETE FROM usuarios WHERE rut = '$rut'";

if (mysqli_query($enlace, $query)) {
    echo json_encode(["success" => true, "message" => "Usuario eliminado correctamente"]);
} else {
    echo json_encode(["success" => false, "message" => "No se pudo eliminar el usuario"]);
}
?>
