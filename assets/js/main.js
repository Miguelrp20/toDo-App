const listaTodo = document.getElementById('listaTodo');
const listaDone = document.getElementById('listaDone');
const listaCheck = document.getElementById('listaCheck');
const input = document.getElementById('todoInp');
const listasDrop = document.querySelectorAll('.drop-zone');

const lineDone = document.getElementById('lineDone');

const tableros = document.getElementById('tableros');
const divCrearTablero = document.getElementById('crearTablero');

const titleTablero = document.getElementById('title');
const descripTablero = document.getElementById('description');

let tablerosArr = [];

// function checkTareaF(event, ulTarea){
//     if (event.checked) {
//         listaDone.appendChild(ulTarea);
//     } else {
//         listaCheck.insertBefore(lineDone, ulTarea);
//     }
// }

// function mostrarTareas(tarea){
//     const ulTarea = document.createElement('ul');
//     const taskId = 'task-' + Date.now();
//     ulTarea.id = taskId; 

//     ulTarea.classList.add('flex', 'items-center', 'gap-2', 'draggable');
//     ulTarea.setAttribute('draggable', 'true');

//     ulTarea.addEventListener('dragstart', (event) => {
//         event.dataTransfer.setData('text/plain', event.target.id);
//         event.target.classList.add('dragging');
//     });

//     const checkTarea = document.createElement('input');
//     checkTarea.setAttribute('type', 'checkbox');
//     checkTarea.classList.add('form-checkbox', 'w-5');
//     checkTarea.id = 'checkTarea';

//     const inputTarea = document.createElement('div');
//     inputTarea.setAttribute('class', 'w-full border-b border-gray-200 focus:border-indigo-500 transition-all duration-300 ease-in-out focus:outline-none me-5 my-2 font-bold cursor-pointer');
//     inputTarea.innerHTML = tarea;
    
//     ulTarea.appendChild(checkTarea);
//     ulTarea.appendChild(inputTarea);

//     checkTarea.addEventListener('change', (event) => {
//         checkTareaF(event.target, ulTarea);
//     });

//     listaTodo.appendChild(ulTarea);
// }

// listasDrop.forEach(dropZone => {
//     dropZone.addEventListener('dragover', (event) => {
//         event.preventDefault();
//         event.currentTarget.classList.add('dragover');
//     });

//     dropZone.addEventListener('dragleave', (event) => {
//         event.currentTarget.classList.remove('dragover');
//     });

//     dropZone.addEventListener('drop', (event) => {
//         event.preventDefault();
//         event.currentTarget.classList.remove('dragover');
//         const data = event.dataTransfer.getData('text/plain');
//         const draggedElement = document.getElementById(data);

//         if (draggedElement) {
//             event.currentTarget.insertBefore(draggedElement, lineDone);
//             draggedElement.classList.remove('dragging');
//         }
//     });
// });

// input.addEventListener('keydown', (event) => {
//     if (event.key == 'Enter') {
//         mostrarTareas(input.value);
//         input.value = '';
//     }
// });

    let cantidadArchivosSelec = 0;

function crearTablero(){

    const cardC = document.createElement('div');

    cardC.innerHTML = `
    <div class="max-w-md w-full p-6 space-y-4 bg-gray-900 border border-gray-800 rounded-lg shadow-xl">
        <form id="tableroForm">
          <div class="h-48 border-2 border-dashed border-gray-700 rounded-md flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-colors duration-200 hover:bg-gray-800 mb-2" onclick="imageTablero()" id="image-preview">
            <svg class="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span class="text-gray-500 font-medium">Importar imagen</span>
            <input type="file" id="file-input" class="hidden" accept="image/*">
          </div>
  
          <div class="mb-2">
            <label for="title" class="sr-only">Título</label>
            <input type="text" id="title" placeholder="Escribe tu título" class="w-full px-4 py-2 border-b-2 border-gray-700 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors duration-200">
            <p id="title-error" style="color: red; margin-top: 3px"></p>
          </div>
  
          <div class="mb-2">
              <label for="description" class="sr-only">Descripción</label>
              <textarea id="description" rows="3" placeholder="Escribe una descripción" class="w-full px-4 py-2 border-b-2 border-gray-700 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors duration-200 resize-none"></textarea>
                <p id="descrip-error" style="color: red; margin-top: 3px"></p>
          </div>
  
          <div class="m-0 p-0 w-full flex justify-end">
            <button id="btnGuardar" disabled class="px-3 py-1 bg-gray-500 rounded-md text-gray-900 " onclick="guardarTablero()" type="submit">Guardar</button>
          </div>
        </form>
      </div>`;
    
    tableros.insertBefore(cardC, divCrearTablero);
    
    const inputFile = document.getElementById('file-input');
    const tableroForm = document.getElementById('tableroForm');
    const imagenArea = document.getElementById('image-preview');

    inputFile.addEventListener('change', (event) => {

    cantidadArchivosSelec = event.target.files.length;

    const title = document.getElementById('title');
    const descripcion = document.getElementById('description');

    const titleInput = title.value;
    const descripInput = descripcion.value;
    const botonGuardar = document.getElementById('btnGuardar');

    if (descripInput != '' && titleInput != '' && cantidadArchivosSelec > 0) {
            console.log('tiene dato title');
            
            botonGuardar.disabled = false;
            botonGuardar.classList.add('cursor-pointer', 'hover:bg-gray-800', 'hover:text-gray-500');
        }else{
            botonGuardar.disabled = true;
            botonGuardar.classList.remove('cursor-pointer', 'hover:bg-gray-800', 'hover:text-gray-500');
        }

    console.log('seleccionada');

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.alt = event.name;
        img.src = event.target.result;

        img.classList.add('w-full', 'h-full', 'object-cover', 'rounded-md');
    
        const numeroDeHijosAEliminar = 3; 
        for (let i = numeroDeHijosAEliminar - 1; i >= 0; i--) {
            imagenArea.removeChild(imagenArea.children[i])
        }

        imagenArea.appendChild(img);
    }
    reader.readAsDataURL(file)
    })

    tableroForm.addEventListener('submit', (event) => {
        event.preventDefault()
    })

    manejoForm()
}

function manejoForm(){
    
    const title = document.getElementById('title');
    const mensajeTitleError = document.getElementById('title-error');

    const descripcion = document.getElementById('description');
    const mensajeDescripError = document.getElementById('descrip-error');

    title.addEventListener('input', () => {

    const titleInput = title.value;
    const descripInput = descripcion.value;
    const botonGuardar = document.getElementById('btnGuardar');


        if (titleInput == '') {
            mensajeTitleError.textContent = 'Ingresa un título válido.';
            title.style.borderColor = 'red';
        }else{
            mensajeTitleError.textContent = '';
            title.style.borderColor = '';
        }

        if (descripInput != '' && titleInput != '' && cantidadArchivosSelec > 0) {
            console.log('tiene dato title');
            
            botonGuardar.disabled = false;
            botonGuardar.classList.add('cursor-pointer', 'hover:bg-gray-800', 'hover:text-gray-500');
        }else{
            botonGuardar.disabled = true;
            botonGuardar.classList.remove('cursor-pointer', 'hover:bg-gray-800', 'hover:text-gray-500');
        }
    })

    descripcion.addEventListener('input', () => {
    const titleInput = title.value;
    const descripInput = descripcion.value;
    const botonGuardar = document.getElementById('btnGuardar');

        if (descripInput == '') {
            mensajeDescripError.textContent = 'Ingresa una descripción válida.';
            descripcion.style.borderColor = 'red';                    
        }else{
            mensajeDescripError.textContent = '';
            descripcion.style.borderColor = '';
        }

        if (descripInput != '' && titleInput != '' && cantidadArchivosSelec > 0) {
            console.log('tiene dato descrip');
            
            botonGuardar.disabled = false;
            botonGuardar.classList.add('cursor-pointer', 'hover:bg-gray-800', 'hover:text-gray-500');
        }else{
            botonGuardar.disabled = true;
            botonGuardar.classList.remove('cursor-pointer', 'hover:bg-gray-800', 'hover:text-gray-500');
        }
    })
}

function imageTablero(){
    let inputFile = document.getElementById('file-input');
    inputFile.click()
}

function guardarTablero(){
    // tablerosArr.push({
    //     tabImagenTitle: titleTablero.value,
    //     tabImagenDescrip: descripTablero.value,
    //     tabImagenUrl: imagenArea.childNodes[0].src
    // })

    // console.log(tablerosArr);

    const cardTableroCargado = `<div class="max-w-md w-full p-6 space-y-4 bg-gray-900 border border-gray-800 rounded-lg shadow-xl">
          <div class="h-48 border-2 border-dashed border-gray-700 rounded-md flex flex-col items-center justify-center p-4 text-center transition-colors duration-200 " id="image-preview">
            <img src="${imagenArea.childNodes[0].src}" alt="${imagenArea.childNodes[0].alt}">
          </div>
  
          <div>
            <label for="title" class="sr-only">Título</label>
            <div type="text" id="title" placeholder="Escribe tu título" class="w-full px-4 py-2 border-b-2 border-gray-700 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors duration-200">${titleTablero.value}
            </div>
  
            <div>
                <label for="description" class="sr-only">Descripción</label>
                <div id="description" rows="3" placeholder="Escribe una descripción" class="w-full px-4 py-2 border-b-2 border-gray-700 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors duration-200 resize-none">${descripTablero.value}</div>
            </div>
          </div>
      </div>`;

    tableros.appendChild(cardTableroCargado);
    
}
