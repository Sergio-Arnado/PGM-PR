<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// Incluir conexión
include("conectar_db.php");

// Obtener datos JSON del body
$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->correo) || !isset($data->contraseña)) {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    exit;
}

$correo = mysqli_real_escape_string($enlace, $data->correo);
$contrasena = mysqli_real_escape_string($enlace, $data->contraseña);

$query = "SELECT * FROM usuarios WHERE correo = '$correo' AND contraseña = '$contrasena'";
$resultado = mysqli_query($enlace, $query);

if (mysqli_num_rows($resultado) > 0) {
    $usuario = mysqli_fetch_assoc($resultado);

    echo json_encode([
        "success" => true,
        "rol" => $usuario['id_perfil'],
        "nombre" => $usuario['nombres']
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Credenciales inválidas"]);
}
?>
