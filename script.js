document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = ''; // Clear the list
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.classList.toggle('completed', task.completed);

            li.innerHTML = `
                <span>${task.text}</span>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
            `;
            li.querySelector('span').addEventListener('click', () => toggleComplete(index));

            taskList.appendChild(li);
        });
    }

    // Function to add a new task
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            updateLocalStorage();
            renderTasks();
        }
    });

    // Toggle task completion
    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        updateLocalStorage();
        renderTasks();
    }

    // Delete task
    window.deleteTask = function(index) {
        tasks.splice(index, 1);
        updateLocalStorage();
        renderTasks();
    }

    // Update localStorage
    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Initial render
    renderTasks();
});
