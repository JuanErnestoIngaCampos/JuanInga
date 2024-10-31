// Abrir modal para crear una nueva denuncia
function abrirModalCrear() {
    document.getElementById("denunciaForm").reset(); // Limpiar el formulario
    document.getElementById("id").value = ""; // Asegurarse de que el ID esté vacío
    document.getElementById("denunciaModalLabel").innerText = "Nuevo Reporte de Denuncia";
    document.getElementById("guardarDenuncia").onclick = crearDenuncia; // Asigna la función para crear
}

// Mostrar toast
function mostrarToast(mensaje) {
    const toastMessage = document.getElementById("toastMessage");
    toastMessage.innerText = mensaje; // Establecer el mensaje del toast

    const toast = new bootstrap.Toast(document.getElementById("toastSuccess"));
    toast.show(); // Mostrar el toast
}

// Crear denuncia
function crearDenuncia() {
    const formData = new URLSearchParams(new FormData(document.getElementById("denunciaForm")));

    fetch('denuncias/crear.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        mostrarToast(data.message || data.error || "Error al crear denuncia"); // Mostrar el mensaje del toast
        cargarDenuncias(); // Recargar la lista de denuncias
        const modal = bootstrap.Modal.getInstance(document.getElementById("denunciaModal"));
        modal.hide();
    })
    .catch(error => console.error('Error:', error));
}

// Cargar denuncias y mostrar en la tabla
function cargarDenuncias() {
    fetch('denuncias/leer.php')
        .then(response => response.json())
        .then(denuncias => {
            let output = '';
            denuncias.forEach(denuncia => {
                output += `
                    <tr>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick='abrirModalEditar(${JSON.stringify(denuncia)})'>✏️</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarDenuncia(${denuncia.id})">🗑️</button>
                        </td>
                        <td>${denuncia.id}</td>
                        <td>${denuncia.titulo}</td>
                        <td>${denuncia.descripcion}</td>
                        <td>${denuncia.ubicacion}</td>
                        <td>${denuncia.ciudadano}</td>
                        <td>${denuncia.telefono_ciudadano}</td>
                        <td>${denuncia.fecha}</td>
                        <td>${denuncia.estado}</td>
                    </tr>
                `;
            });
            document.getElementById('listaDenuncias').innerHTML = output;
        })
        .catch(error => console.error('Error al cargar denuncias:', error));
}

// Abrir modal para editar una denuncia existente
function abrirModalEditar(denuncia) {
    document.getElementById("denunciaModalLabel").innerText = "Editar Reporte de Denuncia";
    document.getElementById("id").value = denuncia.id; // Establecer el ID
    document.getElementById("titulo").value = denuncia.titulo;
    document.getElementById("descripcion").value = denuncia.descripcion;
    document.getElementById("ubicacion").value = denuncia.ubicacion;
    document.getElementById("ciudadano").value = denuncia.ciudadano;
    document.getElementById("telefono_ciudadano").value = denuncia.telefono_ciudadano;
    document.getElementById("fecha").value = denuncia.fecha;
    document.getElementById("estado").value = denuncia.estado;

    // Cambiar el evento del botón "Guardar" a actualización
    document.getElementById("guardarDenuncia").onclick = function() {
        actualizarDenuncia(denuncia.id);
    };

    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById("denunciaModal"));
    modal.show();
}

// Actualizar denuncia
function actualizarDenuncia(id) {
    const formData = new URLSearchParams(new FormData(document.getElementById("denunciaForm")));
    formData.append('id', id); // Añadir el ID a los datos del formulario

    fetch('denuncias/actualizar.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        mostrarToast(data.message || "Denuncia actualizada"); // Mostrar el mensaje del toast
        cargarDenuncias(); // Recargar la lista de denuncias
        const modal = bootstrap.Modal.getInstance(document.getElementById("denunciaModal"));
        modal.hide();
    })
    .catch(error => console.error('Error al actualizar denuncia:', error));
}

// Variables globales
let idDenunciaAEliminar; // Para almacenar el ID de la denuncia a eliminar

// Eliminar denuncia
function eliminarDenuncia(id) {
    idDenunciaAEliminar = id; // Almacenar ID de la denuncia a eliminar

    // Mostrar el modal de confirmación
    const modalConfirmar = new bootstrap.Modal(document.getElementById("confirmarEliminacionModal"));
    modalConfirmar.show();

    // Configurar el botón de eliminación en el modal
    document.getElementById("btnEliminar").onclick = function() {
        fetch('denuncias/eliminar.php', {
            method: 'POST',
            body: new URLSearchParams({ id: idDenunciaAEliminar }) // Enviar ID
        })
        .then(response => response.json())
        .then(data => {
            mostrarToast(data.message || "Denuncia eliminada"); // Mostrar el mensaje del toast
            cargarDenuncias(); // Recargar la lista de denuncias
            modalConfirmar.hide(); // Cerrar el modal
        })
        .catch(error => console.error('Error al eliminar denuncia:', error)); // Manejo de errores
    };
}

// Buscar denuncias
function buscarDenuncias() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase(); // Convierte la búsqueda a minúsculas
    const table = document.getElementById('listaDenuncias');
    const rows = table.getElementsByTagName('tr'); // Obtiene todas las filas de la tabla

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let found = false; // Variable para determinar si se encontró el término de búsqueda

        // Verifica en cada celda si contiene el texto de búsqueda
        for (let j = 1; j < cells.length; j++) { // Comienza desde 1 para omitir la columna de opciones
            if (cells[j]) {
                const cellValue = cells[j].textContent || cells[j].innerText; // Obtiene el contenido de la celda
                if (cellValue.toLowerCase().indexOf(filter) > -1) {
                    found = true; // Se encontró el término
                    break; // Salir del bucle si se encuentra
                }
            }
        }

        // Muestra u oculta la fila según si se encontró el término
        if (found) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}

// Cargar denuncias al iniciar la página
cargarDenuncias();
