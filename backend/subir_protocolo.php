<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

include("conectar_db.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titulo = $_POST['titulo'] ?? '';
    $descripcion = $_POST['descripcion'] ?? '';
    $subido_por = $_POST['subido_por'] ?? '';
    $archivo = $_FILES['archivo_pdf'];

    if ($archivo && $archivo['type'] === 'application/pdf' && $archivo['error'] === UPLOAD_ERR_OK) {
        $nombreArchivo = basename($archivo['name']);
        $rutaDestino = "protocolos/" . $nombreArchivo;

        if (move_uploaded_file($archivo['tmp_name'], $rutaDestino)) {
            $stmt = $enlace->prepare("INSERT INTO protocolos (titulo, descripcion, archivo_pdf, fecha_subida, subido_por) VALUES (?, ?, ?, NOW(), ?)");
            $stmt->bind_param("sssi", $titulo, $descripcion, $nombreArchivo, $subido_por);

            if ($stmt->execute()) {
                echo json_encode(["success" => true, "message" => "Protocolo subido correctamente"]);
            } else {
                echo json_encode(["success" => false, "message" => "Error al guardar en la base de datos"]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Error al mover el archivo"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Archivo inválido o no se recibió"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
}
?>
