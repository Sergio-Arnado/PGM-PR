<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("conectar_db.php");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id_protocolo)) {
    echo json_encode(["success" => false, "message" => "ID del protocolo no proporcionado"]);
    exit;
}

$id_protocolo = intval($data->id_protocolo);

// Consultamos el archivo actual
$sqlArchivo = "SELECT archivo_pdf FROM protocolos WHERE id_protocolo = $id_protocolo";
$result = mysqli_query($enlace, $sqlArchivo);

if ($row = mysqli_fetch_assoc($result)) {
    $archivo = $row['archivo_pdf'];
    $ruta = "protocolos/" . $archivo;

    if (file_exists($ruta)) {
        unlink($ruta); // elimina archivo físico
    }

    $query = "DELETE FROM protocolos WHERE id_protocolo = $id_protocolo";
    if (mysqli_query($enlace, $query)) {
        echo json_encode(["success" => true, "message" => "Protocolo eliminado correctamente"]);
    } else {
        echo json_encode(["success" => false, "message" => "No se pudo eliminar de la base de datos"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Protocolo no encontrado"]);
}
?>
