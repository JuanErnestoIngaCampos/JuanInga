<?php
require_once '../src/conexion.php';

try {
    $sql = "SELECT * FROM denuncias";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $denuncias = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($denuncias);
} catch (PDOException $e) {
    echo json_encode(["error" => "Error al obtener denuncias: " . $e->getMessage()]);
}
?>
