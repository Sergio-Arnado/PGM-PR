<?php
// Conexión a la base de datos
$servidor = "localhost";
$usuario = "root";
$clave = "";
$baseDeDatos = "pgm-pr"; 

$enlace = mysqli_connect($servidor, $usuario, $clave, $baseDeDatos);

// Verificar conexión
if (!$enlace) {
    die("Conexión fallida: " . mysqli_connect_error());
}
?>
