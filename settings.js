let todo_list_element = document.querySelector('#list')
const ls_key = "ls-todo-list-xyz";

function loadPage() {
    let all_ls_todo = getLS(ls_key)
    all_ls_todo.forEach(element => {
        createNewTodo(element)
    });
}
loadPage();

function handleForm(event) {
    event.preventDefault();
    let new_todo = event.target.new_todo.value;
    if (new_todo == "") {
        alert("Lütfen bir değer giriniz!")
    } else {
        createNewTodo(new_todo)
        var ls_todo_list = getLS(ls_key)
        ls_todo_list.unshift(new_todo)
        setLS(ls_key,ls_todo_list)
        event.target.new_todo.value = "";
    }
}
function deleteTodoItem(event) {
    var ls_todo_list = getLS(ls_key)
    let deletedTodo = event.path[1].childNodes[0].nodeValue.trim()
    var newList = ls_todo_list.filter(todo => todo !=deletedTodo)
    event.path[1].remove()
    setLS(ls_key,newList)
}
function createNewTodo(todo_str) {
    new_todo_element = document.createElement("li")
    new_todo_element.innerHTML = `
            ${todo_str} <span onclick="deleteTodoItem(event)" >X</span>
        `
    new_todo_element.addEventListener('click', addCheckedClass)
    todo_list_element.appendChild(new_todo_element)
}
function setLS(key, value) {
    var strObj = JSON.stringify(value)
    localStorage.setItem(key, strObj)
}
function getLS(key) {
    var str = localStorage.getItem(key)
    return str==null ? [] : JSON.parse(str)
}
function addCheckedClass(){
    this.className == "checked" ? this.classList.remove("checked") : this.classList.add("checked")
}