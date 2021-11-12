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
    })

let arrayTarefas = JSON.parse(localStorage.getItem('dados')) || []

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