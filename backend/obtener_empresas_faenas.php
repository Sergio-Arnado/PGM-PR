<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("conectar_db.php");

$empresas = [];
$sqlEmpresas = "SELECT * FROM empresas";
$resEmpresas = mysqli_query($enlace, $sqlEmpresas);

while ($empresa = mysqli_fetch_assoc($resEmpresas)) {
    $id_empresa = $empresa['id_empresa'];

    // ✅ Cambio: columna correcta es empresa_id
    $sqlFaenas = "SELECT * FROM faenas WHERE empresa_id = $id_empresa";
    $resFaenas = mysqli_query($enlace, $sqlFaenas);

    $faenas = [];
    while ($faena = mysqli_fetch_assoc($resFaenas)) {
        $faenas[] = $faena;
    }

    $empresa['faenas'] = $faenas;
    $empresas[] = $empresa;
}

echo json_encode($empresas);
?>
