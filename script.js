let container = document.getElementById('container');
// let searchBox = document.getElementById('search-box');
let addBtn = document.getElementById('new-task-btn');
let taskContainer = document.getElementById('task-container');
let taskList = document.getElementById('task-list');
let tasks = document.getElementsByClassName('task');
let tasksArr = Array.from(tasks);
let allBtns = document.querySelectorAll('.btn');
let delBtns = document.getElementsByClassName('delete');
let modifyBtns = document.getElementsByClassName('modify');
let completeBtns = document.getElementsByClassName('complete');

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
});

function addTask() {
    let input = document.getElementById('new-task');
    if (input.value == '') return;
    let modifyIcon = document.createElement('i');
    modifyIcon.classList.add('fa-solid', 'fa-pencil');
    let delIcon = document.createElement('i');
    delIcon.classList.add('fa-solid', 'fa-trash');
    let i = document.createElement('i');
    i.classList.add('fa-solid', 'fa-check');

    let modifyBtn = document.createElement('button');
    modifyBtn.classList.add('btn', 'btn-warning', 'modify');
    modifyBtn.append(modifyIcon);
    modifyBtn.addEventListener('click', modifyTask);

    let delBtn = document.createElement('button');
    delBtn.classList.add('btn', 'btn-danger', 'delete')
    delBtn.append(delIcon);
    delBtn.addEventListener('click', deleteTask);

    let task = document.createElement('li');
    let div = document.createElement('div');
    let label = document.createElement('label');
    div.classList.add('form-check', 'd-flex', 'justify-content-center', 'align-items-center');

    let checkBox = document.createElement('button');
    checkBox.setAttribute('type', 'button');
    checkBox.classList.add('btn', 'border-success');
    checkBox.append(i);
    checkBox.addEventListener('click', completeTask);

    let btns = document.createElement('span');
    btns.append(modifyBtn, delBtn);

    div.append(checkBox);
    label.append(input.value);
    div.append(label);
    task.append(div);
    task.append(btns);
    taskList.append(task);

    input.value = '';
}

// searchBox.addEventListener('keydown', searchTasks);

Array.from(completeBtns).forEach(completeBtn => completeBtn.addEventListener('click', completeTask));

Array.from(modifyBtns).forEach(modifyBtn => modifyBtn.addEventListener('click', modifyTask));

Array.from(delBtns).forEach(delBtn => delBtn.addEventListener('click', deleteTask));

function completeTask(e) {
    let taskToComplete = e.target.closest('li');
    taskToComplete.classList.add('bg-success');
    let modifyBtn = taskToComplete.querySelector('.modify');
    modifyBtn.disabled = true;

}

function modifyTask(e) {
    let taskToModify = e.target.closest('li');
    let label = taskToModify.querySelector('label');
    //label.classList.add('col-12')

    let span = document.createElement('span');

    span.classList.add('d-flex', 'mx-4', 'col-md-12', 'col-sm-9');

    let modifiedInput = document.createElement('input');
    modifiedInput.classList.add('bg-secondary', 'form-control')
    modifiedInput.setAttribute('type', 'text');
    modifiedInput.value = label.innerText;
    let firstChild = taskToModify.firstElementChild;

    let button = document.createElement('button');
    let i = document.createElement('i');
    i.classList.add('fa-solid', 'fa-check');
    button.append(i);
    button.classList.add('mx-2', 'btn', 'btn-primary')
    span.append(modifiedInput, button);
    firstChild.append(span);

    label.innerText = '';
    Array.from(modifyBtns).forEach(modifyBtn => modifyBtn.removeEventListener('click', modifyTask));

    button.addEventListener('click', () => {
        changeValue(taskToModify, modifiedInput);
        span.remove();

    });
}

function changeValue(taskToModify, modifiedInput) {
    taskToModify.children[0].children[1].innerHTML = modifiedInput.value;
    // modifiedInput.remove();
    //button.remove();
    Array.from(modifyBtns).forEach(modifyBtn => modifyBtn.addEventListener('click', modifyTask));

}

function deleteTask(e) {
    let taskToBeDeleted = e.target.closest('li');
    taskToBeDeleted.remove();
}


// function searchTasks() {
//     let searchText = searchBox.value;
//     tasksArr.forEach(task => task);
// }


