
//------------------- Botão adicionar (Modal adicionar) ----------------------
let button = document.querySelector('.body--lista--btnAdd');

    button.addEventListener('click', ()=>{
    let modal = document.querySelector('.modal--adicionar');
    let add = modal.className;
    modal.setAttribute("class", `${add} mostrar`);
})

//------------------- Botão fechar (Modal adicionar) ----------------------
let fecharAdicionar = document.querySelector('.modalAdicionar--fechar')

    fecharAdicionar.addEventListener('click', fecharModalAdicionar);

//------------------- Botão salvar (Modal adicionar) ----------------------
let saveAdd = document.querySelector('.modalAdicionar--save')

    saveAdd.addEventListener('click', ()=>{
        setListStorage();
        fecharModalAdicionar();
        refresh()
    })


//------------------- Adicionando tarefas no localStorage ----------------------
let arrayTarefas = JSON.parse(localStorage.getItem('dados')) || []
mostrarTarefasSalvas();
checkarTarefas();
editTarefa()

function setListStorage(){
    let description = document.querySelector('.modalAdicionar--input');
    let getDescription = description.value;
    arrayTarefas.push(getDescription);
    localStorage.setItem('dados', JSON.stringify(arrayTarefas));
    description.value = '';
}

//------------------- Função para fechar o modal de adicionar ----------------------
function fecharModalAdicionar(){
    let descriptionAdd = document.querySelector('.modalAdicionar--input');
    let modalAdd = document.querySelector('.modal--adicionar') 
        if(modalAdd.className == 'modal--adicionar mostrar'){ 
            modalAdd.classList.remove('mostrar')
            descriptionAdd.value = ''
        }
}

//------------------- Funções para mostrar as tarefas no começo ----------------------

function mostrarTarefasSalvas(){
    for (let tarefaIndice = 0; tarefaIndice < arrayTarefas.length; tarefaIndice++){
        let tarefa = document.createElement('div');
        tarefa.className = 'body--lista--tarefa';

        tarefa.innerHTML = `
        <div class="container--tarefas">
            <div class="lista--checkName">
                <img src="../images/Tarefa.png" class="tarefa"/>
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

//------------------- Evento para verificar tarefas checadas ----------------------
function checkarTarefas(){
    let tarefaCheck = document.querySelectorAll('img')
    let nameCheck = document.querySelectorAll('label')
    
    for(let i=0;i<tarefaCheck.length;i++){
        tarefaCheck[i].addEventListener('click',()=>{
            let src = tarefaCheck[i].getAttribute('src')
                if(src=='../images/Tarefa.png'){
                    tarefaCheck[i].setAttribute('src','../images/Tarefaok.png')
                    tarefaCheck[i].setAttribute('class', 'tarefa--tarefaChecked')
                    nameCheck[i].style.textDecoration = 'line-through';
                }else{
                    tarefaCheck[i].setAttribute('src','../images/Tarefa.png')
                    tarefaCheck[i].setAttribute('class', 'tarefa')
                    nameCheck[i].style.textDecoration = 'none';
                }
        })
    }
}

//------------------- Evento para modificar o nome da tarefa ----------------------
let indiceClick = 0;
function editTarefa(){
    
    let modalEditar = document.querySelector('.modal--editar')
    let buttonEdit = document.querySelectorAll('.lista--opcoes--editar')
        buttonEdit.forEach(addEvent)

    let fechar = document.querySelector('.modalEditar--fechar')
        fechar.addEventListener('click', (event)=>{
                modalEditar.classList.remove('mostrar')
            return 0;
        })

    let btnSave = document.querySelector('.modalEdit--save')
        btnSave.addEventListener('click',()=>{
        modalEditar.classList.remove('mostrar')
            
        let newName = document.querySelector('.modalEdit--input').value
        let list = JSON.parse(localStorage.getItem('dados'))

            list[indiceClick] = newName;
            localStorage.setItem('dados', JSON.stringify(list))
            refresh()
        })      
}

function addEvent(element, indice, array){

    let modalEditar = document.querySelector('.modal--editar')
    element.addEventListener('click', (event)=>{
        if(event.target.className == 'lista--opcoes--editar'){
            modalEditar.classList.add('mostrar')
            console.log(indice)
            indiceClick = indice
        }
    })

}

const refresh = ()=>{
    location.reload()
}
