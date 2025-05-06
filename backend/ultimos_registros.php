<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

include("conectar_db.php");

$registros = [];

// Últimos reportes
$queryReportes = "SELECT descripcion, fecha AS fecha_registro FROM reportes ORDER BY fecha DESC LIMIT 3";
$resReportes = mysqli_query($enlace, $queryReportes);
while ($row = mysqli_fetch_assoc($resReportes)) {
    $registros[] = [
        "tipo" => "Reporte",
        "descripcion" => $row['descripcion'],
        "fecha" => $row['fecha_registro']
    ];
}

// Últimos protocolos
$queryProtocolos = "SELECT titulo AS descripcion, fecha_subida AS fecha_registro FROM protocolos ORDER BY fecha_subida DESC LIMIT 3";
$resProtocolos = mysqli_query($enlace, $queryProtocolos);
while ($row = mysqli_fetch_assoc($resProtocolos)) {
    $registros[] = [
        "tipo" => "Protocolo",
        "descripcion" => $row['descripcion'],
        "fecha" => $row['fecha_registro']
    ];
}

// Últimos usuarios
$queryUsuarios = "SELECT CONCAT(nombres, ' ', apellidos) AS descripcion, fecha_creacion FROM usuarios ORDER BY fecha_creacion DESC LIMIT 3";
$resUsuarios = mysqli_query($enlace, $queryUsuarios);
while ($row = mysqli_fetch_assoc($resUsuarios)) {
    $registros[] = [
        "tipo" => "Usuario",
        "descripcion" => "Nuevo usuario: " . $row['descripcion'],
        "fecha" => $row['fecha_creacion']
    ];
}

// Ordenar todo por fecha descendente (los más nuevos primero)
usort($registros, function ($a, $b) {
    return strtotime($b['fecha']) - strtotime($a['fecha']);
});

// Limitar a los 5 más recientes
$registros = array_slice($registros, 0, 5);

echo json_encode($registros);
