<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

include("conectar_db.php");

$sql = "SELECT * FROM empresas ORDER BY nombre_empresa ASC";
$result = mysqli_query($enlace, $sql);

$empresas = [];

while ($row = mysqli_fetch_assoc($result)) {
    $empresas[] = $row;
}

echo json_encode($empresas);
?>
