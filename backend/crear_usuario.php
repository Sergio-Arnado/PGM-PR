<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// Incluir la conexión
include("conectar_db.php");

// Leer los datos del frontend
$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->rut) &&
    isset($data->nombres) &&
    isset($data->apellidos) &&
    isset($data->correo) &&
    isset($data->contraseña) &&
    isset($data->cargo) &&
    isset($data->id_perfil) &&
    isset($data->activo)
) {
    // Escapar datos
    $rut = mysqli_real_escape_string($enlace, $data->rut);
    $nombres = mysqli_real_escape_string($enlace, $data->nombres);
    $apellidos = mysqli_real_escape_string($enlace, $data->apellidos);
    $correo = mysqli_real_escape_string($enlace, $data->correo);
    $contrasena = mysqli_real_escape_string($enlace, $data->contraseña); // más adelante usaremos hash
    $cargo = mysqli_real_escape_string($enlace, $data->cargo);
    $perfil = intval($data->id_perfil);
    $activo = intval($data->activo);

    // Verificar si el correo o rut ya existen
    $verificar = "SELECT * FROM usuarios WHERE rut = '$rut' OR correo = '$correo'";
    $resultadoVerificar = mysqli_query($enlace, $verificar);

    if (mysqli_num_rows($resultadoVerificar) > 0) {
        echo json_encode(["success" => false, "message" => "El usuario ya existe (correo o RUT duplicado)"]);
        exit;
    }

    // Insertar usuario
    $query = "INSERT INTO usuarios (rut, nombres, apellidos, correo, contraseña, cargo, id_perfil, activo) 
              VALUES ('$rut', '$nombres', '$apellidos', '$correo', '$contrasena', '$cargo', $perfil, $activo)";
    
    if (mysqli_query($enlace, $query)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al guardar el usuario"]);
    }

} else {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
}
?>
