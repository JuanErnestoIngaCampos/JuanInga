<?php
require_once '../src/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id']; // Obtiene el ID de la denuncia a eliminar

    try {
        $sql = "DELETE FROM denuncias WHERE id = :id"; // SQL para eliminar la denuncia
        $stmt = $conn->prepare($sql);
        $stmt->execute([':id' => $id]); // Ejecuta la consulta con el ID proporcionado
        echo json_encode(["message" => "Denuncia eliminada"]); // Respuesta exitosa
    } catch (PDOException $e) {
        echo json_encode(["error" => "Error al eliminar denuncia: " . $e->getMessage()]); // Manejo de errores
    }
}
?>
