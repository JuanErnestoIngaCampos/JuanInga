<?php
require_once '../src/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $titulo = $_POST['titulo'];
    $descripcion = $_POST['descripcion'];
    $ubicacion = $_POST['ubicacion'];
    $ciudadano = $_POST['ciudadano'];
    $telefono = $_POST['telefono_ciudadano'];
    $fecha = $_POST['fecha'];
    $estado = $_POST['estado'];

    try {
        $sql = "UPDATE denuncias SET titulo = :titulo, descripcion = :descripcion, ubicacion = :ubicacion, 
                ciudadano = :ciudadano, telefono_ciudadano = :telefono, fecha = :fecha, estado = :estado WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            ':id' => $id,
            ':titulo' => $titulo,
            ':descripcion' => $descripcion,
            ':ubicacion' => $ubicacion,
            ':ciudadano' => $ciudadano,
            ':telefono' => $telefono,
            ':fecha' => $fecha,
            ':estado' => $estado
        ]);
        echo json_encode(["message" => "Denuncia actualizada"]);
    } catch (PDOException $e) {
        echo json_encode(["error" => "Error al actualizar denuncia: " . $e->getMessage()]);
    }
}
?>

