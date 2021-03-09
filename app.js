document.getElementById("formTask").addEventListener("submit", saveTask);

function saveTask(e) {
    
    let title =  document.getElementById("title").value;
    let description = document.getElementById("description").value;

    const task = {
        title,
        description
    };
    if (localStorage.getItem("tasks") === null) {
        let tasks = [];
        tasks.push (task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    getTasks();
    e.preventDefault();
}
function getTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let tasksView = document.getElementById("tasks");

    tasksView.innerHTML = "";

    for (let i=0; i< tasks.length; i++) {
        let title = tasks[i].title;
        let description = tasks[i].description;
        
        tasksView.innerHTML += `<div class= "container">
        <div class="row m-2">
        <div class="col-sm">
        <div class="card">
        <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${description}</p>
        <a class="btn btn-danger" onclick="deleteTask('${title}')" >Borrar</a>
        </div>
        </div>
        </div>
        </div>`
    }
}
function deleteTask(title) {
let tasks = JSON.parse (localStorage.getItem("tasks")) ;
for (let i=0; i<tasks.length; i++) {
    if (tasks[i].title == title) {
        tasks.splice(i,1);
    }
}
localStorage.setItem("tasks", JSON.stringify(tasks));
getTasks();
}
getTasks();





