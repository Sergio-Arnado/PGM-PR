<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

$logFile = "logs_empresas.txt";

if (file_exists($logFile)) {
    file_put_contents($logFile, ""); // Vacía el archivo
    echo json_encode(["success" => true, "message" => "Log limpiado correctamente"]);
} else {
    echo json_encode(["success" => false, "message" => "El archivo de log no existe"]);
}
?>