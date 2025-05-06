<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("conectar_db.php");

// Solo para desarrollo: mostrar errores
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Leer el JSON recibido
$data = json_decode(file_get_contents("php://input"), true);

// Validar que los campos requeridos estén presentes
if (
    !$data ||
    !isset($data['nombre_faena']) ||
    !isset($data['id_empresa']) ||
    !isset($data['descripcion']) ||
    !isset($data['ubicacion'])
) {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    exit;
}

// Sanitizar inputs
$nombre = htmlspecialchars(strip_tags(mysqli_real_escape_string($enlace, $data['nombre_faena'])));
$descripcion = htmlspecialchars(strip_tags(mysqli_real_escape_string($enlace, $data['descripcion'])));
$ubicacion = htmlspecialchars(strip_tags(mysqli_real_escape_string($enlace, $data['ubicacion'])));
$id_empresa = (int)$data['id_empresa'];

// Verificar si ya existe una faena con el mismo nombre en esa empresa
$verificar = "SELECT * FROM faenas WHERE nombre_faena = '$nombre' AND empresa_id = $id_empresa";
$resultado = mysqli_query($enlace, $verificar);

if (mysqli_num_rows($resultado) > 0) {
    echo json_encode(["success" => false, "message" => "La faena ya está registrada para esta empresa"]);
    exit;
}

// Insertar nueva faena
$query = "INSERT INTO faenas (nombre_faena, descripcion, empresa_id, ubicacion)
          VALUES ('$nombre', '$descripcion', $id_empresa, '$ubicacion')";

if (mysqli_query($enlace, $query)) {
    echo json_encode(["success" => true, "message" => "Faena registrada correctamente"]);
} else {
    echo json_encode(["success" => false, "message" => "Error al registrar faena: " . mysqli_error($enlace)]);
}
?>
