const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];



const saveTasks = () => {
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
};


const updateStats = () => {

    totalTasks.textContent = tasks.length;

    completedTasks.textContent =
        tasks.filter(task => task.completed).length;
};


const renderTasks = () => {

    taskList.innerHTML = "";

    if(tasks.length === 0){

        const li = document.createElement("li");
        li.classList.add("empty");
        li.textContent = "No tasks available";

        taskList.appendChild(li);

        updateStats();
        return;
    }

    tasks.forEach(task => {

        const li = document.createElement("li");

        li.className =
            `task-item ${task.completed ? "completed" : ""}`;

        li.dataset.id = task.id;

        li.innerHTML = `
            <span class="task-text">
                ${task.text}
            </span>

            <div class="task-actions">

                <button
                    class="complete-btn">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                <button
                    class="delete-btn">
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(li);
    });

    updateStats();
};



const addTask = () => {

    const text = taskInput.value.trim();

    if(text === ""){

        alert("Please enter a task");
        return;
    }

    const newTask = {
        id: Date.now(),
        text,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    renderTasks();

    taskInput.value = "";
};



addBtn.addEventListener(
    "click",
    addTask
);

taskInput.addEventListener(
    "keypress",
    (event) => {

        if(event.key === "Enter"){
            addTask();
        }
    }
);



taskList.addEventListener(
    "click",
    (event) => {

        const taskElement =
            event.target.closest(".task-item");

        if(!taskElement) return;

        const taskId =
            Number(taskElement.dataset.id);

        if(event.target.classList.contains("complete-btn")){

            tasks = tasks.map(task => {

                if(task.id === taskId){

                    return {
                        ...task,
                        completed: !task.completed
                    };
                }

                return task;
            });

            saveTasks();
            renderTasks();
        }

        if(event.target.classList.contains("delete-btn")){

            tasks =
                tasks.filter(
                    task => task.id !== taskId
                );

            saveTasks();
            renderTasks();
        }
    }
);


document.addEventListener(
    "DOMContentLoaded",
    () => {
        renderTasks();
    }
);