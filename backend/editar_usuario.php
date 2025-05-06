<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// Conexión a la base de datos
include("conectar_db.php");

$data = json_decode(file_get_contents("php://input"));

if (
    !isset($data->rut) || !isset($data->nombres) || !isset($data->apellidos) ||
    !isset($data->correo) || !isset($data->contraseña) || !isset($data->cargo) ||
    !isset($data->id_perfil) || !isset($data->activo)
) {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    exit;
}

$rut = mysqli_real_escape_string($enlace, $data->rut);
$nombres = mysqli_real_escape_string($enlace, $data->nombres);
$apellidos = mysqli_real_escape_string($enlace, $data->apellidos);
$correo = mysqli_real_escape_string($enlace, $data->correo);
$contrasena = mysqli_real_escape_string($enlace, $data->contraseña);
$cargo = mysqli_real_escape_string($enlace, $data->cargo);
$id_perfil = mysqli_real_escape_string($enlace, $data->id_perfil);
$activo = mysqli_real_escape_string($enlace, $data->activo);

// Actualizar el usuario
$query = "UPDATE usuarios SET 
    nombres = '$nombres',
    apellidos = '$apellidos',
    correo = '$correo',
    contraseña = '$contrasena',
    cargo = '$cargo',
    id_perfil = '$id_perfil',
    activo = '$activo'
    WHERE rut = '$rut'";

if (mysqli_query($enlace, $query)) {
    echo json_encode(["success" => true, "message" => "Usuario actualizado"]);
} else {
    echo json_encode(["success" => false, "message" => "Error al actualizar usuario"]);
}
?>
