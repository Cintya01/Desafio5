var tasksArray = [
    { id: generateRandomId(), description: "Tarea 1", done: false },
            { id: generateRandomId(), description: "Tarea 2", done: true },
            { id: generateRandomId(), description: "Tarea 3", done: false }
];

function generateRandomId() {
    const idLenght = 2;
    const number = "0123456789";
    let id = "";
    for (let i = 0; i < idLenght; i++) {
        const aleatorio = Math.floor(Math.random() * number.length);
        id += number.charAt(aleatorio);}
        return id;
}
function markTaskDone(taskId) {
    let checkbox = document.querySelector(`#checkbox-${taskId}`);
    let taskObject = tasksArray.find(task => task.id === taskId);
    if (taskObject) {
        taskObject.done = checkbox.checked;
        updateSummary();
    }
}

function addTask() {
    let taskInput = document.getElementById("task");
    let taskText = taskInput.value.trim();

    if (taskText !== "") {
        let taskId = generateRandomId();
        let taskList = document.getElementById("taskList");
        let listItem = document.createElement("li");
        listItem.id = taskId;
        listItem.innerHTML = `
            <h4>ID</h4>
            <span>${taskId}</span>
            <h4>Tarea</h4>
            <span>${taskText}</span>
            <input id="checkbox-${taskId}" type="checkbox" onchange="markTaskDone('${taskId}')">
            <button onclick="removeTask('${taskId}')">Eliminar</button>
        `;
        taskList.appendChild(listItem);
        taskInput.value = "";

        let taskObject = {
            id: taskId,
            description: taskText,
            done: false
        };

        tasksArray.push(taskObject);
        updateSummary();
    }
}


function removeTask(taskId) {
    let taskList = document.getElementById("taskList");
    let listItem = document.getElementById(taskId);
    taskList.removeChild(listItem);

    let taskIndex = tasksArray.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasksArray.splice(taskIndex, 1);
        updateSummary();
    }
}

function updateSummary() {
    let doneCount = tasksArray.filter(task => task.done).length;
    let totalCount = tasksArray.length;
    let summaryOne = document.getElementById("summaryOne");
    summaryOne.innerHTML = `${doneCount}`;
    let summaryTwo = document.getElementById("summaryTwo");
    summaryTwo.innerHTML = `${totalCount}`;
}

function loadTasks() {
    let taskList = document.querySelector("#taskList");
    tasksArray.forEach(function (task) {
        let listItem = document.createElement("li");
        listItem.id = task.id;
        listItem.innerHTML = `
            <h4>ID</h4>
            <span>${task.id}</span>
            <h4>Tarea</h4>
            <span>${task.description}</span>
            <input id="checkbox-${task.id}" type="checkbox" onchange="markTaskDone('${task.id}')" ${task.done ? "checked" : ""}>
            <button onclick="removeTask('${task.id}')">Eliminar</button>
        `;
        taskList.appendChild(listItem);
    });
    updateSummary();
}
loadTasks();