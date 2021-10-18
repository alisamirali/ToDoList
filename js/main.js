let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDev = document.querySelector(".tasks");

// Empty List To Store Tasks
let listOfTasks = [];

// Chech If There Are Tasks In Local Storage
if (localStorage.getItem("tasks")) {
    listOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

// Add Task
submit.onclick = function() {
    if (input.value !== "") {
        addTaskToList(input.value); // Add Task To The List
        input.value = ""; // Empty Input Field

    }
}

// Click On Task Element
tasksDev.addEventListener("click", (e) => {
    // Delete Button
    if (e.target.classList.contains("delete")) {
        // Remove Task From Local Storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));

        // Remove Element From Page 
        e.target.parentElement.remove();
    }

    // Task Element
    if (e.target.classList.contains("task")) {
        // Toggle Completed For Task
        toggleTaskStatusWith(e.target.getAttribute("data-id"));

        // Toggle Done Class
        e.target.classList.toggle("done");
    }
});

function addTaskToList(taskContent) {

    // Task Data 
    const task = {
        id: Date.now(),
        title: taskContent,
        completed: false,
    };

    // Push Task To The List Of Tasks
    listOfTasks.push(task);

    // Add Tasks To Page
    addElementsToPageFrom(listOfTasks);

    // Add Tasks To Local Storage
    addDataToLocalStorageFrom(listOfTasks);
}

function addElementsToPageFrom(listOfTasks) {

    // Empty Tasks Dev
    tasksDev.innerHTML = "";

    // Looping On List Of Tasks
    listOfTasks.forEach(task => {

        // Create Main Div
        let div = document.createElement("div");
        div.className = "task";

        // Check If Task Is Done
        if (task.completed) {
            div.className = "task done";
        }

        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));

        // Create Delete Button
        let span = document.createElement("span");
        span.className = "delete";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);

        // Add Task Div To Container
        tasksDev.appendChild(div);
    });
}

function addDataToLocalStorageFrom(listOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(listOfTasks));
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");

    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId) {

    // For Explain
    // for (let i = 0; i < listOfTasks.length; i++) {
    //     console.log(`${listOfTasks[i].id} === ${taskId}`)
    // }

    listOfTasks = listOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(listOfTasks);
}

function toggleTaskStatusWith(taskId) {
    for (let i = 0; i < listOfTasks.length; i++) {
        if (listOfTasks[i].id == taskId) {
            listOfTasks[i].completed == false ? (listOfTasks[i].completed = true) : (listOfTasks[i].completed = false)
        }
    }
    addDataToLocalStorageFrom(listOfTasks);
}