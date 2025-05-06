<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("conectar_db.php");

$query = "SELECT u.rut, u.nombres, u.apellidos, u.correo, u.cargo, p.nombre_perfil, u.activo, f.nombre_faena
          FROM usuarios u
          JOIN perfiles p ON u.id_perfil = p.id_perfil
          LEFT JOIN faenas f ON u.id_faena = f.id_faena";

$resultado = mysqli_query($enlace, $query);

$usuarios = [];

while ($fila = mysqli_fetch_assoc($resultado)) {
    $usuarios[] = $fila;
}

echo json_encode($usuarios);
?>
