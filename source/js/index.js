let button = document.querySelector('.body--lista--btnAdd');

    button.addEventListener('click', ()=>{
    let modal = document.querySelector('.modal');
    let add = modal.className;
    modal.setAttribute("class", `${add} mostrar`);
})

let fechar = document.querySelector('.modal--fechar')

    fechar.addEventListener('click', fecharModal);


let save = document.querySelector('.modal--save')

    save.addEventListener('click', ()=>{
        setListStorage();
        fecharModal();
        mostrarTarefa();
    })

let arrayTarefas = JSON.parse(localStorage.getItem('dados')) || []
mostrarTarefasSalvas();

function fecharModal(){
    let description = document.querySelector('.modal--input');
    let getDescription = description.value;
    let modal = document.querySelector('.modal');
    modal.classList.remove('mostrar');
    description.value = '';
}

function setListStorage(){
    let description = document.querySelector('.modal--input');
    let getDescription = description.value;
    arrayTarefas.push(getDescription);
    localStorage.setItem('dados', JSON.stringify(arrayTarefas));
    description.value = '';
}

function mostrarTarefa(){
    let tarefa = document.createElement('div');
    tarefa.className = 'body--lista--tarefa';

    tarefa.innerHTML = `
    <div class="container--tarefas">
        <div class="lista--checkName">
            <input type="checkbox" />
            <label for="checkbox-1">${arrayTarefas[arrayTarefas.length-1]}</label>
        </div>
        <div class="lista--opcoes">
            <button class="lista--opcoes--editar"></button>
            <button class="lista--opcoes--excluir"></button>
        </div>
    </div>
    `;
    let divPai = document.getElementsByClassName('body--lista--positionBtnAdd')[0].parentNode;
    let btnAdd = document.getElementsByClassName('body--lista--positionBtnAdd')[0];

    divPai.insertBefore(tarefa, btnAdd);
}

function mostrarTarefasSalvas(){
    for (let tarefaIndice = 0; tarefaIndice < arrayTarefas.length; tarefaIndice++){
        let tarefa = document.createElement('div');
        tarefa.className = 'body--lista--tarefa';

        tarefa.innerHTML = `
        <div class="container--tarefas">
            <div class="lista--checkName">
                <input type="checkbox" />
                <label for="checkbox-1">${arrayTarefas[tarefaIndice]}</label>
            </div>
            <div class="lista--opcoes">
                <button class="lista--opcoes--editar"></button>
                <button class="lista--opcoes--excluir"></button>
            </div>
        </div>
        `;
        let divPai = document.getElementsByClassName('body--lista--positionBtnAdd')[0].parentNode;
        let btnAdd = document.getElementsByClassName('body--lista--positionBtnAdd')[0];

        divPai.insertBefore(tarefa, btnAdd)
    }
}