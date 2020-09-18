const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.submit-btn');
const todoList = document.querySelector('.todo-list');


document.addEventListener('DOMContentLoaded', getLocalTodos);
todoButton.addEventListener('click', addItems);
todoList.addEventListener('click', checkDelete);



function addItems(event) {
    event.preventDefault();

    const todoDiv  = document.createElement('div');
    todoDiv.classList.add('todo');

    const todoItems = document.createElement('li');
    todoItems.classList.add('todo-items');

    todoInputValue = todoInput.value.trim();
    if (todoInputValue === '' || todoInputValue.length > 26) {
        alert('Please enter something within 26 characters');
        todoInput.value = '';
    } else {
        todoItems.innerText = todoInput.value;
        saveLocally(todoInputValue);
        todoDiv.appendChild(todoItems);
        const checkBtn = document.createElement('button');
        checkBtn.classList.add('checkbtn');
        checkBtn.innerHTML = '<i class="fas fa-check"></i>';
        todoDiv.appendChild(checkBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deletebtn');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        todoDiv.appendChild(deleteBtn);

        todoList.appendChild(todoDiv);

        todoInput.value = '';
    }

}

function checkDelete(e) {
    const item = e.target;

    if (item.classList[0] === 'deletebtn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    }

    if (item.classList[0] === 'checkbtn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}


function saveLocally(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getLocalTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        const todoDiv  = document.createElement('div');
        todoDiv.classList.add('todo');
    
        const todoItems = document.createElement('li');
        todoItems.classList.add('todo-items');
    
        todoItems.innerText = todo;
        todoDiv.appendChild(todoItems);
        const checkBtn = document.createElement('button');
        checkBtn.classList.add('checkbtn');
        checkBtn.innerHTML = '<i class="fas fa-check"></i>';
        todoDiv.appendChild(checkBtn);
    
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deletebtn');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        todoDiv.appendChild(deleteBtn);
    
        todoList.appendChild(todoDiv);

    });
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const item = todo.children[0].innerText;
    const itemIndex = todos.indexOf(item);
    todos.splice(itemIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));

}