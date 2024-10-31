<?php
require_once '../src/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titulo = $_POST['titulo'];
    $descripcion = $_POST['descripcion'];
    $ubicacion = $_POST['ubicacion'];
    $ciudadano = $_POST['ciudadano'];
    $telefono = $_POST['telefono_ciudadano'];
    $fecha = $_POST['fecha'];
    $estado = $_POST['estado'];

    try {
        $sql = "INSERT INTO denuncias (titulo, descripcion, ubicacion, ciudadano, telefono_ciudadano, fecha, estado) 
                VALUES (:titulo, :descripcion, :ubicacion, :ciudadano, :telefono, :fecha, :estado)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            ':titulo' => $titulo,
            ':descripcion' => $descripcion,
            ':ubicacion' => $ubicacion,
            ':ciudadano' => $ciudadano,
            ':telefono' => $telefono,
            ':fecha' => $fecha,
            ':estado' => $estado
        ]);
        echo json_encode(["message" => "Denuncia creada exitosamente"]);
    } catch (PDOException $e) {
        echo json_encode(["error" => "Error al crear denuncia: " . $e->getMessage()]);
    }
}
?>
