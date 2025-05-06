<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("conectar_db.php");

// Función para limpiar y validar datos
function limpiarDato($dato, $enlace) {
    return htmlspecialchars(strip_tags(mysqli_real_escape_string($enlace, $dato)));
}

// Leer datos
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    // 🆕 Log tipo ERROR: no llegaron datos
    error_log("[" . date("Y-m-d H:i:s") . "] ERROR: No se recibieron datos para crear empresa\n", 3, "logs_empresas.txt");
    echo json_encode(["success" => false, "message" => "Datos no válidos"]);
    exit;
}

// Limpiar entradas
$nombre = limpiarDato($data['nombre_empresa'], $enlace);
$rut = limpiarDato($data['rut_empresa'], $enlace);
$direccion = limpiarDato($data['direccion'], $enlace);
$telefono = limpiarDato($data['telefono'], $enlace);
$correo = limpiarDato($data['correo_empresa'], $enlace);

// Validar formato de correo
if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    // 🆕 Log tipo ADVERTENCIA: correo inválido
    error_log("[" . date("Y-m-d H:i:s") . "] ADVERTENCIA: Correo inválido para $nombre ($rut): $correo\n", 3, "logs_empresas.txt");
    echo json_encode(["success" => false, "message" => "Formato de correo no válido"]);
    exit;
}

// Validar máximo 3 empresas
$checkCantidad = mysqli_query($enlace, "SELECT COUNT(*) AS total FROM empresas");
$cantidad = mysqli_fetch_assoc($checkCantidad)['total'];

if ($cantidad >= 3) {
    // 🆕 Log tipo ADVERTENCIA: límite alcanzado
    error_log("[" . date("Y-m-d H:i:s") . "] ADVERTENCIA: Límite de empresas alcanzado al intentar crear: $nombre ($rut)\n", 3, "logs_empresas.txt");
    echo json_encode(["success" => false, "message" => "Ya hay 3 empresas registradas"]);
    exit;
}

// Validar RUT único
$checkRut = mysqli_query($enlace, "SELECT * FROM empresas WHERE rut_empresa = '$rut'");
if (mysqli_num_rows($checkRut) > 0) {
    // 🆕 Log tipo ADVERTENCIA: RUT duplicado
    error_log("[" . date("Y-m-d H:i:s") . "] ADVERTENCIA: RUT duplicado al intentar crear empresa: $nombre ($rut)\n", 3, "logs_empresas.txt");
    echo json_encode(["success" => false, "message" => "El RUT ya está registrado"]);
    exit;
}

// Insertar empresa
$query = "INSERT INTO empresas (nombre_empresa, rut_empresa, direccion, telefono, correo_empresa)
          VALUES ('$nombre', '$rut', '$direccion', '$telefono', '$correo')";

if (mysqli_query($enlace, $query)) {
    // 🆕 Log tipo ÉXITO
    error_log("[" . date("Y-m-d H:i:s") . "] ÉXITO: Empresa creada: $nombre ($rut)\n", 3, "logs_empresas.txt");
    echo json_encode(["success" => true, "message" => "Empresa registrada correctamente"]);
} else {
    // 🆕 Log tipo ERROR: fallo en inserción SQL
    error_log("[" . date("Y-m-d H:i:s") . "] ERROR: Fallo al registrar empresa: $nombre ($rut)\n", 3, "logs_empresas.txt");
    echo json_encode(["success" => false, "message" => "Error al registrar la empresa"]);
}
?>
