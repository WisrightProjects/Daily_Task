let input = document.getElementById('input')
let todoList = document.getElementById('todoList')
let button = document.getElementById('add')

let todos = [];

button.addEventListener('click', ()=>{
    todos.push(input.value)
    addtodo(input.value)
    input.value=''
})

function addtodo(todo){
    let para = document.createElement('p');
    para.innerText = todo;
    todoList.appendChild(para)
    localStorage.setItem('todos', JSON.stringify(todos))
    para.addEventListener('click',()=>{
        para.style.textDecoration = 'line-through' 
        remove(todo)
    })
    para.addEventListener('dblclick',()=>{
        todoList.removeChild(para)
        remove(todo)
    })
}

function remove(todo){
   let index = todos.indexOf(todo)
   if(index>-1)
     todos.splice(index,1)
}