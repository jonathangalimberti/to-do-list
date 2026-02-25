const form = document.getElementById('task-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('task-input');
    const value = input.value;
    console.log('Task added:', value);
    if (value) {
        const li = document.createElement('li');
        li.innerHTML = `${value} <span class="edit-btn">✏️</span><span class="delete-btn">🗑️</span>`;
        const ul = document.getElementById('task-list');
        ul.appendChild(li);
        storeTasksInLocalStorage(value);
        input.value = '';
    }})

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
    } else if (e.target.classList.contains('edit-btn')) {
        const li = e.target.parentElement;
        const currentText = li.firstChild.textContent.trim();
        const newText = prompt('Edit task:', currentText);
        if (newText) {
            li.firstChild.textContent = newText + ' ';
        }}})

        function storeTasksInLocalStorage(task) {

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        tasks.push(task);

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const ul = document.getElementById('task-list');
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `${task} <span class="edit-btn">✏️</span><span class="delete-btn">🗑️</span>`;
            ul.appendChild(li);
        });
    }

    loadTasksFromLocalStorage();