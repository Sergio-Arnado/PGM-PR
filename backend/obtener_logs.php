<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain");

$archivo = "logs_empresas.txt";

if (file_exists($archivo)) {
    echo file_get_contents($archivo);
} else {
    echo "No hay registros.";
}
?>
