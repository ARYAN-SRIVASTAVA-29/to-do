let tasks = [];

// Initialize active tab
let activeTab = 'do';

// Add a task
function addTask(event) {
    event.preventDefault();
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const task = { text: taskText, status: activeTab };
        tasks.push(task);
        taskInput.value = '';
        renderTasks(activeTab);
    }
}

// Render tasks 
function renderTasks(tab) {
    const taskList = document.getElementById(`${tab}-tasks`);
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        if (task.status === tab) {
            const taskElement = document.createElement('li');
            taskElement.draggable = true;
            taskElement.className = 'task';
            taskElement.textContent = task.text;
            taskElement.setAttribute('ondragstart', 'drag(event)');
            taskElement.setAttribute('data-index', index);
            taskList.appendChild(taskElement);
        }
    });
}

// Chang tab
function changeTab(tab) {
    activeTab = tab;
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tabElement) => {
        tabElement.classList.remove('active');
    });
    const currentTab = document.getElementById(`${tab}-tab`);
    currentTab.classList.add('active');
    renderTasks(tab);
}

// Drag 
function drag(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.index);
    event.dataTransfer.effectAllowed = 'move';
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event, tab) {
    event.preventDefault();
    const taskIndex = event.dataTransfer.getData('text/plain');
    const task = tasks[taskIndex];
    const previousTab = task.status;
    if (previousTab !== tab) {
        task.status = tab;
        renderTasks(previousTab);
        renderTasks(tab);
    }
}






renderTasks('do');


