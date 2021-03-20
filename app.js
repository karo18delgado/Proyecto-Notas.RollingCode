const formulario = document.getElementById('formTask');
const tituloInput = document.getElementById('title');
const descripcionInput = document.getElementById('description');
const cardNotas = document.getElementById('tasks');
const editarNotas = document.getElementById('notaEditar');
const editarTitulo = document.getElementById('tituloEditar');
const editarDescripcion = document.getElementById('descripcionEditar')
const json = localStorage.getItem('notas');
let notas = JSON.parse(json) || [];
let NotaId = '';

function generarID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
}
formulario.onsubmit = function (e) {
    e.preventDefault();
    const nota = {
        id: generarID(),
        titulo: tituloInput.value,
        descripcion: descripcionInput.value,
        registro: Date.now(),
    };
    notas.push(nota);
    const json = JSON.stringify(notas);
    localStorage.setItem('notas', json);
    mostrarNotas()
    formulario.reset();
};


function mostrarNotas() {
    let filas = [];
    for (let i = 0; i < notas.length; i++) {
        const nota = notas[i];
        const tr =
            `<div class="col-sm-6">
            <div class="card m-4">
                <div class="card-body">
                    <h5 class="card-title">${nota.titulo}</h5>
                    <p class="card-text">${nota.descripcion}</p>
                    <button onclick="mostrarDetalle('${nota.id}')" type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modalDetalle">Ver detalle</button>
                    <button onclick="eliminarNota('${nota.id}')" type="button" class="btn btn-danger btn-sm">Eliminar</button>
                    <button onclick="cargarModalEditar('${nota.id}')" type="button" class="btn btn-success btn-sm" data-bs-toggle="modal"
                    data-bs-target="#modalEditar">Editar</button>
                    </div>
            </div>
        </div>`;
        filas.push(tr);
    }
    cardNotas.innerHTML = filas.join('');
}
mostrarNotas();

function mostrarDetalle(id) {
    const notaEncontrada = notas.find((nota) => nota.id === id);
    const detalleDiv = document.getElementById('formDetalle');
    const fecha = new Date(notaEncontrada.registro);
    console.log('mostrarDetalle - fecha', fecha);
    const detallesNotas = `
        <p>Titulo: ${notaEncontrada.titulo}</p>
        <p>Descripcion: ${notaEncontrada.descripcion}</p>
        <p>Fecha de nota: ${fecha.toLocaleString()}</p>
    `;
    detalleDiv.innerHTML = detallesNotas;
}

function eliminarNota(id) {
    
    let notasFiltradas = [];
    for (let i = 0; i < notas.length; i++) {
        const nota = notas[i];
        const coincideId = nota.id === id;
        if (!coincideId) {
            notasFiltradas.push(nota);
        }
    }
    const json = JSON.stringify(notasFiltradas);
    localStorage.setItem('notas', json);
    notas = notasFiltradas;
    mostrarNotas();
}

function cargarModalEditar(id) {
    const notaEncontrada = notas.find((nota) => nota.id === id);
    editarTitulo.value = notaEncontrada.titulo;
    editarDescripcion.value = notaEncontrada.descripcion;
    notaId = notaEncontrada.id;
}
editarNotas.onsubmit = function editarNota(e) {
    e.preventDefault();
    const notasModificadas = notas.map((nota) => {
        if (nota.id === notaId) {
            const notasModificadas = {
                ...nota,
                titulo: editarTitulo.value,
                descripcion: editarDescripcion.value,
            };
            return notasModificadas;
        } else {
            return nota;
        }
    });

    const json = JSON.stringify(notasModificadas);
    localStorage.setItem('notas', json);
    notas = notasModificadas;
    mostrarNotas();
    const modalDiv = document.getElementById('modalEditar');
    const modalBootstrap = bootstrap.Modal.getInstance(modalDiv);
    modalBootstrap.hide();
};