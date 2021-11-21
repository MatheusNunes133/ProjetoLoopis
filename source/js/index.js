
let arrayTarefas = JSON.parse(localStorage.getItem('dados')) || []


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
        atualizarTela()
    })


//------------------- Adicionando tarefas no localStorage ----------------------


function setListStorage(){
    let description = document.querySelector('.modalAdicionar--input');
    let getDescription = description.value;
        arrayTarefas.push({tarefa: getDescription,status: ''})
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

function createTarefa(nomeTarefa, status, indice){
    let tarefa = document.createElement('div')
        tarefa.className = 'body--lista--tarefa'
        tarefa.innerHTML = `
            <div class="container--tarefas">
            <div class="lista--checkName">
                <input type="checkbox" ${status} class="lista--checkName--input" data-indice=${indice}>
                <label for="checkbox-1">${nomeTarefa}</label>
            </div>
            <div class="lista--opcoes">
                <button class="lista--opcoes--editar"></button>
                <button class="lista--opcoes--excluir"></button>
            </div>
        </div>
        `

    let divPai = document.querySelector('.body--lista')
        divPai.appendChild(tarefa)
}

const atualizarTela = ()=>{
    limparTarefas()
    arrayTarefas.forEach((item, indice) =>{
            createTarefa(item.tarefa, item.status,indice)
            checkTarefas()
            editTarefa()
            /* removeTarefa() */
    })
}

atualizarTela()

checkTarefas()
editTarefa()
/* removeTarefa() */

function limparTarefas(){
    const lista = document.querySelector('.body--lista')
     while(lista.firstChild){
        lista.removeChild(lista.lastChild)
     }
}

// --------------------------checar tarefas--------------------------------

function checkTarefas(){
let inputs = document.querySelectorAll('.lista--checkName--input')

inputs.forEach((element, indice)=>{
    element.addEventListener('click', (event)=>{
        if(element.checked){
            arrayTarefas[indice].status = 'checked'
            localStorage.setItem('dados', JSON.stringify(arrayTarefas))
        }else{
            arrayTarefas[indice].status = ''
            localStorage.setItem('dados', JSON.stringify(arrayTarefas))
        }
    })
})
}

let indiceClick = 0;
function editTarefa(){
    let buttonSaveEdit = document.querySelector('.modalEdit--save')
        buttonSaveEdit.addEventListener('click', (event)=>{
            let description = document.querySelector('.modalEdit--input').value
                arrayTarefas[indiceClick].tarefa = description
                localStorage.setItem('dados', JSON.stringify(arrayTarefas))
            let modalEdit = document.querySelector('.modal--editar');
                    modalEdit.classList.remove('mostrar')
                description.value = ''
            atualizarTela()
        })
        editTarefaModal()
}



function editTarefaModal(){
    let buttonEdit = document.querySelectorAll('.lista--opcoes--editar')
        buttonEdit.forEach((element, indice)=>{
            element.addEventListener('click', ()=>{
                let modalEdit = document.querySelector('.modal--editar');
                    modalEdit.classList.add('mostrar')
                    indiceClick = indice
            })
        })

    let buttonFecharEdit = document.querySelector('.modalEditar--fechar')
        buttonFecharEdit.addEventListener('click',()=>{
            let modalEdit = document.querySelector('.modal--editar');
                    modalEdit.classList.remove('mostrar')
        })
}


/* 
let indiceDeleteClick = 0;
function removeTarefa(){
    let buttonExcluir = document.querySelector('.modalDelete--excluir')
        buttonExcluir.addEventListener('click', ()=>{
            console.log(indiceDeleteClick)
        })

    DeleteModal()
} 


function DeleteModal(){
    let removeIcon = document.querySelectorAll('.lista--opcoes--excluir')
        removeIcon.forEach((element, indice)=>{
            element.addEventListener('click', ()=>{
                let modalDelete = document.querySelector('.modal--deletar')
                    modalDelete.classList.add('mostrar')
                    
            })
            indiceDeleteClick = indice
        })

    let buttonFecharDelete = document.querySelector('.modalDelete--fechar')
        buttonFecharDelete.addEventListener('click',()=>{
            let modalDelete = document.querySelector('.modal--deletar')
                    modalDelete.classList.remove('mostrar')
        })

    const removeItem = (indice)=>{
        arrayTarefas.splice(indice, 1)
        atualizarTela()
    }
} */


    