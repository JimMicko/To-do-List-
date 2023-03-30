var inputTask = document.getElementById("inputTask");
var taskInput = document.getElementById("taskInput");
var submitTask = document.getElementById("submitTask");
var taskContainer = document.getElementById("taskContainer");
var taskCount = 0;

function showAddTaskForm() {
    inputTask.style.display = "block";
}

window.onload = function() {
    fetch("http://localhost:5000/route/getTask")
    .then(res => res.json())
    .then(data => {
        var tasks = data.tasks;
        
        /* to have separate input box for all data retrieved use forEach */
        tasks.forEach(function(task) {

            var taskValue = task.contentTask;
            var id = task.contentID;

            if (taskValue === "") {
                return;
            }
            
            var newTask = document.createElement("div");
            newTask.classList.add("taskList");
        
            var newTask_content = document.createElement("div");
            newTask_content.classList.add("listTask");
        
            taskContainer.appendChild(newTask);
            newTask.appendChild(newTask_content);
        
            var newTask_input = document.createElement("input");
            newTask_input.classList.add("form-control");
            newTask_input.type = "text";
            newTask_input.innerText = taskValue;
            newTask_input.value = taskValue;
            newTask_input.setAttribute("readonly", "readonly");

            newTask_content.appendChild(newTask_input);
        
            taskCount++;
        
            taskInput.value = "";
        
            var myBtn = document.createElement("div");
            myBtn.classList.add("action");
        
            var editBtn = document.createElement("button");
            editBtn.classList.add("edit");
            editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square edit-btn"></i>`;
        
            var deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete");
            deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can deleteBtn"></i>`;
        
            var doneBtn = document.createElement("button");
            doneBtn.classList.add("doneBtn");
            doneBtn.innerHTML = "Done";
        
            myBtn.appendChild(editBtn);
            myBtn.appendChild(deleteBtn);
            myBtn.appendChild(doneBtn);
        
            newTask.appendChild(myBtn);
            
            editBtn.addEventListener('click', function (event) {
                event.stopPropagation();
                if (editBtn.innerHTML == `<i class="fa-solid fa-pen-to-square edit-btn"></i>`) {
                    newTask_input.removeAttribute("readonly");
                    newTask_input.focus();
                    editBtn.innerHTML = `<i class="fa-regular fa-floppy-disk"></i>`;
                    doneBtn.disabled = true;
                    taskCount = taskCount + 0;
                }
                else {
                    newTask_input.setAttribute("readonly", "readonly");
                    doneBtn.disabled = false;
                    editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square edit-btn"></i>`;
                    taskCount = taskCount + 0;

                    const updatedData = {
                        "Task": newTask_input.value
                    }
                    
                    fetch(`http://localhost:5000/route/editTask/${id}`, {
                        method: "PUT",
                        headers: {
                            'Accept': "application/json",
                            'Content-Type': "application/json"
                        },
                        body: JSON.stringify(updatedData)
                    })
                    .then(response => {
                        if (response.ok) {
                            console.log("Task edited successfully");
                            /* handle the successful response from the server */
                        } else {
                            console.error("Failed to edit task");
                            /* handle the unsuccessful response from the server */
                        }
                    });
                }
            });
        
            deleteBtn.addEventListener('click', function () {
                if (deleteBtn.classList.contains('delete')) {
                    taskContainer.removeChild(newTask);
                    taskCount = taskCount - 1;
                }
        
                fetch(`http://localhost:5000/route/deleteTask/${id}`, {
                method: "DELETE",
        
                })
                .then(response => {
                    if (response.ok) {
                        console.log("Task deleted successfully");
                    } else {
                        console.error("Failed to delete task");
                    }
                });
                
            });
        
            doneBtn.addEventListener('click', function() {
                if (doneBtn.classList.contains('doneBtn')) {
                    newTask_input.classList.add('done');
                    newTask_input.focus();
                    doneBtn.innerText = "✔️";
                    editBtn.disabled = true;
                    taskCount = taskCount + 0;
                }
            });
        });
    });
    console.log('The page has finished loading!');
};

inputTask.addEventListener("submit", function(event) {
    event.preventDefault();
    
    var taskValue = taskInput.value;

    if (taskValue === "") {
        return;
    }
    
    var newTask = document.createElement("div");
    newTask.classList.add("taskList");

    var newTask_content = document.createElement("div");
    newTask_content.classList.add("listTask");

    taskContainer.appendChild(newTask);
    newTask.appendChild(newTask_content);

    var newTask_input = document.createElement("input");
    newTask_input.classList.add("form-control");
    newTask_input.type = "text";
    newTask_input.innerText = taskValue;
    newTask_input.value = taskValue;
    newTask_input.setAttribute("readonly", "readonly");

    newTask_content.appendChild(newTask_input);

    taskCount++;

    taskInput.value = "";

    var myBtn = document.createElement("div");
    myBtn.classList.add("action");

    var editBtn = document.createElement("button");
    editBtn.classList.add("edit");
    editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square edit-btn"></i>`;

    var deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can deleteBtn"></i>`;

    var doneBtn = document.createElement("button");
    doneBtn.classList.add("doneBtn");
    doneBtn.innerHTML = "Done";

    myBtn.appendChild(editBtn);
    myBtn.appendChild(deleteBtn);
    myBtn.appendChild(doneBtn);

    newTask.appendChild(myBtn);


    if (newTask_input >= 5) {
        alert("You have reached the task limit");
        return;
    }

    var id = Math.floor(Math.random() * 1000000);

    editBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        if (editBtn.innerHTML == `<i class="fa-solid fa-pen-to-square edit-btn"></i>`) {
            newTask_input.removeAttribute("readonly");
            newTask_input.focus();
            editBtn.innerHTML = `<i class="fa-regular fa-floppy-disk"></i>`;
            doneBtn.disabled = true;
            taskCount = taskCount + 0;
        }
        else {
            newTask_input.setAttribute("readonly", "readonly");
            doneBtn.disabled = false;
            editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square edit-btn"></i>`;
            taskCount = taskCount + 0;

            const updatedData = {
                "Task": newTask_input.value
            }
            
            fetch(`http://localhost:5000/route/editTask/${id}`, {
                method: "PUT",
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(updatedData)
            })
            .then(response => {
                if (response.ok) {
                    console.log("Task edited successfully");
                } else {
                    console.error("Failed to edit task");
                }
            });
        }
    });

    deleteBtn.addEventListener('click', function () {
        if (deleteBtn.classList.contains('delete')) {
            taskContainer.removeChild(newTask);
            taskCount = taskCount - 1;
        }

        fetch(`http://localhost:5000/route/deleteTask/${id}`, {
        method: "DELETE",

        })
        .then(response => {
            if (response.ok) {
                console.log("Task deleted successfully");
            } else {
                console.error("Failed to delete task");
            }
        });  
    });

    doneBtn.addEventListener('click', function() {
        if (doneBtn.classList.contains('doneBtn')) {
            newTask_input.classList.add('done');
            newTask_input.focus();
            doneBtn.innerText = "✔️";
            editBtn.disabled = true;
            taskCount = taskCount + 0;
        }
    });

    const payLoad = {
        "ID": id,
        "Task": taskValue
    }

    fetch("http://localhost:5000/route/submitTask",{
        method: "POST",
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },

        body: JSON.stringify(payLoad),

    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    });
});