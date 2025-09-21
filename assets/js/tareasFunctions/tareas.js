const listaTodo = document.getElementById('listaTodo');
const listaDone = document.getElementById('listaDone');
const listaCheck = document.getElementById('listaDone');
const input = document.getElementById('todoInp');
const listasDrop = document.querySelectorAll('.drop-zone');
const lineDone = document.getElementById('lineDone');

const paramId = new URLSearchParams(window.location.search).get('id');
const tareas = localStorage.getItem('Tareas');

function checkTareaF(event, ulTarea){
    if (event.checked) {

        const tareaId = ulTarea.id;
        for (let i = 0; i < tarea.length; i++) {

            const element = tarea[i].tareas;
            
            for (let i = 0; i < element.length; i++) {
                const element2 = element[i];

                if (element2.id == tareaId) {
                    element2.done = true;


                }

                tarea
            }
        }

        const tituloTarea = ulTarea.children[1];
        
        ulTarea.classList.remove('draggable');
        tituloTarea.classList.remove('cursor-pointer');
        ulTarea.removeAttribute('draggable');
        listaCheck.appendChild(ulTarea);
    } else {
        const tareaId = ulTarea.id;
        for (let i = 0; i < tarea.length; i++) {
            const element = tarea[i].tareas;
            for (let i = 0; i < element.length; i++) {
                const element2 = element[i];
                if (element2.id == tareaId) {
                    element2.done = false;
                }
            }
        }
        
        const drag = ulTarea.classList.contains('draggable');
        
        if (!drag) {
            const tituloTarea = ulTarea.children[1];
            ulTarea.classList.add('draggable');
            tituloTarea.classList.add('cursor-pointer');
            ulTarea.setAttribute('draggable', true);
            listaCheck.insertBefore(ulTarea,lineDone);
        }
    }

    console.log(tarea);
    

    localStorage.setItem('Tareas', JSON.stringify(tareasLS));
}

function mostrarTareas(tarea, taskId){
    const ulTarea = document.createElement('ul');
    ulTarea.id = taskId; 

    ulTarea.classList.add('flex', 'items-center', 'gap-2', 'draggable');
    ulTarea.setAttribute('draggable', 'true');

    ulTarea.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', event.target.id);
        event.target.classList.add('dragging');
    });

    const checkTarea = document.createElement('input');
    checkTarea.setAttribute('type', 'checkbox');
    checkTarea.classList.add('form-checkbox', 'w-5');
    checkTarea.id = 'checkTarea';

    const inputTarea = document.createElement('div');
    inputTarea.setAttribute('class', 'w-full border-b border-gray-200 focus:border-indigo-500 transition-all duration-300 ease-in-out focus:outline-none me-5 my-2 font-bold cursor-pointer');
    inputTarea.innerHTML = tarea;
    
    ulTarea.appendChild(checkTarea);
    ulTarea.appendChild(inputTarea);

    checkTarea.addEventListener('change', (event) => {
        checkTareaF(event.target, ulTarea);
    });

    listaTodo.appendChild(ulTarea);
}

listasDrop.forEach(dropZone => {
    dropZone.addEventListener('dragover', (event) => {
        event.preventDefault();        
        event.currentTarget.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', (event) => {
        event.currentTarget.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (event) => {
        event.preventDefault();

        event.currentTarget.classList.remove('dragover');
        const data = event.dataTransfer.getData('text/plain');
        const draggedElement = document.getElementById(data);
        
        //texto de la tarea
        const textoLi = draggedElement.children[1].getHTML();

        //id del tablero
        const ulId = event.target.id;
        const idTarea = draggedElement.id

        let tareas = [];

        let tareaObject = {
            id: ulId,
            tareas: tareas
        };

        let tareaDetalle = {
            id: idTarea,
            titulo: textoLi,
            done: false
        }

        for (let i = 0; i < tarea.length; i++) {
            const element = tarea[i];
            for (let i = 0; i < element.tareas.length; i++) {
                const m = element.tareas[i];
                if (m.id === idTarea) {
                    const index = element.tareas.findIndex(m => m.id === idTarea);
                    if (index !== -1) { element.tareas.splice(index, 1) }
                }
            }
        }

        const mismoSecTarea = tarea.findIndex(m => m.id === ulId);

        if (mismoSecTarea >= 0) {
            tarea[mismoSecTarea].tareas.push(tareaDetalle)
        }else{
            tareas.push(tareaDetalle);
            tarea.push(tareaObject); 
        }

        if (draggedElement) {
            const listaDone = event.currentTarget.id;
            
            if (listaDone == 'listaDone') {
                event.currentTarget.insertBefore(draggedElement, lineDone);
            }else{
                event.currentTarget.appendChild(draggedElement);      
            }
            
            draggedElement.classList.remove('dragging');
        }
        localStorage.setItem('Tareas', JSON.stringify(tareasLS))
    });
});

let tareasLS = {};
let tarea = [];

input.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        const taskId = 'task-' + Date.now();
        mostrarTareas(input.value, taskId);
        const tableroInsertado = 'listaTodo';
        
        let tareaDetalle = {
            id: taskId,
            titulo: input.value,
            done:false
        };

        let tareasA = [];

        tareasA.push(tareaDetalle);

        let tareaObject = {
            id: tableroInsertado,
            tareas: tareasA
        }
        
        tareasLS.id = paramId;
        tareasLS.sectionTareas = tarea;

        
        const indexExiste =  tarea.findIndex(m => m.id = tableroInsertado)
        if (indexExiste != -1) {
            console.log('hay index');            
            tarea[indexExiste].tareas.push(tareaDetalle);
        }else{
            tarea.push(tareaObject);        
        }

        localStorage.setItem('Tareas', JSON.stringify(tareasLS));
        input.value = '';
    }
});
