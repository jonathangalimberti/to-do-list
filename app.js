const form = document.getElementById("task-form");
const clearCompletedButton = document.getElementById("clear-completed-button");
const clearAllButton = document.getElementById("clear-all-button");

clearCompletedButton.addEventListener("click", clearCompletedTasks);
clearAllButton.addEventListener("click", clearAllTasks);

const filterSelect = document.getElementById("filter-tasks");
filterSelect.addEventListener("change", () => {
  const filterValue = filterSelect.value;
  const ul = document.getElementById("task-list");
  const tasks = ul.querySelectorAll("li");

  tasks.forEach((task) => {
    const isCompleted = task.classList.contains("completed");

    if (filterValue === "all") {
      task.style.display = "";
    } else if (filterValue === "completed") {
      task.style.display = isCompleted ? "" : "none";
    } else if (filterValue === "pending") {
      task.style.display = !isCompleted ? "" : "none";
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("task-input");
  const value = input.value.trim();
  console.log(value);

  if (value) {
    const ul = document.getElementById("task-list");
    const li = document.createElement("li");
    li.innerHTML = `<span class="task-index">${ul.children.length + 1}.</span> <span class="task-text">${value}</span> <span class="completed-btn">✔️</span> <span class="edit-btn">✏️</span> <span class="delete-btn">🗑️</span>`;

    ul.appendChild(li);
    input.value = "";
    updateLocalStorage();
  }
});

document.addEventListener("click", (e) => {
  const ul = document.getElementById("task-list");
  if (e.target.classList.contains("delete-btn")) {
    e.target.closest("li").remove();
  } else if (e.target.classList.contains("edit-btn")) {
    const li = e.target.closest("li");
    const taskTextEl = li.querySelector(".task-text");
    const currentText = taskTextEl.textContent.trim();
    const newText = prompt("Edit task:", currentText);
    if (newText) {
      taskTextEl.textContent = newText;
    }
  } else if (e.target.classList.contains("completed-btn")) {
    const li = e.target.closest("li");
    li.classList.toggle("completed");
  }

  // actualizar el index de las tareas después de eliminar o editar
  ul.querySelectorAll("li").forEach((li, index) => {
    const idxSpan = li.querySelector(".task-index");
    idxSpan.textContent = `${index + 1}.`;
  });

  updateLocalStorage();
});

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const ul = document.getElementById("task-list");

  console.log("Loading tasks from localStorage:", tasks);

  tasks.forEach((task) => {
    const li = document.createElement("li");
    console.log("Creating task element:", task);
    console.log("Task completed status:", task.completed);
    console.log("Task text:", task.task);
    console.log("Task index:", task.index);
    if (task.completed === true) li.classList.add("completed");
    else li.classList.remove("completed");
    li.innerHTML = `<span class="task-index">${task.index}.</span> <span class="task-text">${task.task}</span> <span class="completed-btn">✔️</span> <span class="edit-btn">✏️</span> <span class="delete-btn">🗑️</span>`;
    ul.appendChild(li);
  });
  // after inserting tasks ensure indexes are correct
  ul.querySelectorAll("li").forEach((li, idx) => {
    li.querySelector(".task-index").textContent = `${idx + 1}.`;
  });
  updateLocalStorage();
  // apply the currently selected filter so loaded tasks respect it
  filterSelect.dispatchEvent(new Event('change'));
}

function updateLocalStorage() {
  const ul = document.getElementById("task-list");
  const tasks = [];

  ul.querySelectorAll("li").forEach((li, index) => {
    const taskText = li.querySelector(".task-text").textContent.trim();
    const isCompleted = li.classList.contains("completed");
    tasks.push({ index: index + 1, task: taskText, completed: isCompleted });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  document.body.classList.add("dark-theme");
}

const toggleThemeButton = document.getElementById("toggle-theme-button");

toggleThemeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark-theme") ? "dark" : "light",
  );
});

function clearCompletedTasks() {
  const ul = document.getElementById("task-list");
  ul.querySelectorAll("li.completed").forEach((li) => li.remove());
  updateLocalStorage();
}

function clearAllTasks() {
  const ul = document.getElementById("task-list");
  ul.innerHTML = "";
  localStorage.removeItem("tasks");
}

loadTasksFromLocalStorage();
