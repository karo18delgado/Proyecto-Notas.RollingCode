document.getElementById("formTask").addEventListener("submit", saveTask);

function generarId() {
    return '_' + Math.random().toString(36).substr(2,9);
};
function saveTask(e) {
    let title =  document.getElementById("title").value;
    let description = document.getElementById("description").value;
    const task = {
        id: generarId(),
        title,
        description,
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
    formTask.reset();
};
function getTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let tasksView = document.getElementById("tasks");

    tasksView.innerHTML = "";

    for (let i=0; i< tasks.length; i++) {
        let title = tasks[i].title;
        let description = tasks[i].description;
        
        tasksView.innerHTML += `
        <div class="col-sm-6">
            <div class="card m-4">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description}</p>
                    <a class="btn btn-danger" onclick="deleteTask('${title}')" >Borrar</a>
                </div>
            </div>
        </div>`
    }
};
function deleteTask(title) {
let tasks = JSON.parse (localStorage.getItem("tasks")) ;
for (let i=0; i<tasks.length; i++) {
    if (tasks[i].title == title) {
        tasks.splice(i,1);
    }
}
localStorage.setItem("tasks", JSON.stringify(tasks));
getTasks();
};
getTasks();





