document.addEventListener('DOMContentLoaded', function() {
    const addTaskButton = document.getElementById('add-task');
    const taskInput = document.getElementById('task-description');
    const taskQuadrant = document.getElementById('task-quadrant');

    // Load tasks from storage
    chrome.storage.sync.get(['tasks'], function(result) {
        if (result.tasks) {
            Object.keys(result.tasks).forEach(quadrant => {
                const quadrantElement = document.getElementById(quadrant);
                const taskList = quadrantElement.querySelector('.task-list');
                result.tasks[quadrant].forEach(task => {
                    addTaskToList(taskList, task);
                });
            });
        }
    });

    addTaskButton.addEventListener('click', function() {
        const taskDescription = taskInput.value.trim();
        const selectedQuadrant = taskQuadrant.value;

        if (taskDescription) {
            const quadrantElement = document.getElementById(selectedQuadrant);
            const taskList = quadrantElement.querySelector('.task-list');
            addTaskToList(taskList, taskDescription);
            saveTask(selectedQuadrant, taskDescription);
            taskInput.value = '';
        }
    });

    function addTaskToList(taskList, taskDescription) {
        const li = document.createElement('li');
        li.textContent = taskDescription;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            li.remove();
            removeTask(taskList.closest('.quadrant').id, taskDescription);
        });
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    function saveTask(quadrant, task) {
        chrome.storage.sync.get(['tasks'], function(result) {
            const tasks = result.tasks || {};
            if (!tasks[quadrant]) {
                tasks[quadrant] = [];
            }
            tasks[quadrant].push(task);
            chrome.storage.sync.set({tasks: tasks});
        });
    }

    function removeTask(quadrant, task) {
        chrome.storage.sync.get(['tasks'], function(result) {
            const tasks = result.tasks || {};
            if (tasks[quadrant]) {
                tasks[quadrant] = tasks[quadrant].filter(t => t !== task);
                chrome.storage.sync.set({tasks: tasks});
        
            }
        });
    }
});