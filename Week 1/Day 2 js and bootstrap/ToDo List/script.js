const form = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const summary = document.getElementById("summary");
const filterButtons = Array.from(document.querySelectorAll(".filters button"));
const clearCompletedButton = document.getElementById("clearCompletedButton");
const emptyListButton = document.getElementById("emptyListButton");

const storageKey = "modern-todo-tasks";
const generateId = () => (globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`);
const tasks = loadTasks();
let activeFilter = "all";

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = taskInput.value.trim();
    if (!title) {
        taskInput.focus();
        return;
    }

    const task = {
        id: generateId(),
        title,
        completed: false,
        createdAt: Date.now(),
    };

    tasks.push(task);
    taskInput.value = "";
    persist();
    render();
});

taskList.addEventListener("click", (event) => {
    const target = event.target;
    const id = target.closest("[data-id]")?.dataset.id;
    if (!id) return;

    if (target.matches(".delete-btn")) {
        removeTask(id);
    }

    if (target.matches(".edit-btn")) {
        startEdit(id);
    }
});

taskList.addEventListener("change", (event) => {
    if (!event.target.matches(".task-checkbox")) return;
    const id = event.target.closest("[data-id]")?.dataset.id;
    toggleTask(id, event.target.checked);
});

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        activeFilter = button.dataset.filter;
        filterButtons.forEach((btn) => btn.setAttribute("aria-pressed", String(btn === button)));
        render();
    });
});

clearCompletedButton.addEventListener("click", () => {
    if (!tasks.some((task) => task.completed)) return;
    const remaining = tasks.filter((task) => !task.completed);
    tasks.splice(0, tasks.length, ...remaining);
    persist();
    render();
});

emptyListButton.addEventListener("click", () => {
    if (!tasks.length) return;
    tasks.splice(0, tasks.length);
    persist();
    render();
});

function render() {
    const visibleTasks = getVisibleTasks();
    taskList.innerHTML = "";

    if (!visibleTasks.length) {
        emptyState.hidden = false;
    } else {
        emptyState.hidden = true;
    }

    for (const task of visibleTasks) {
        const item = document.createElement("li");
        item.className = "task-item";
        item.dataset.id = task.id;
        if (task.completed) {
            item.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", task.completed ? "Mark task as active" : "Mark task as completed");

        const title = document.createElement("span");
        title.className = "task-title";
        title.textContent = task.title;

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.className = "edit-btn";
        editButton.textContent = "Edit";

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        actions.append(editButton, deleteButton);
        item.append(checkbox, title, actions);
        taskList.appendChild(item);
    }

    updateSummary();
}

function getVisibleTasks() {
    const sorted = [...tasks].sort((a, b) => b.createdAt - a.createdAt);
    if (activeFilter === "active") {
        return sorted.filter((task) => !task.completed);
    }
    if (activeFilter === "completed") {
        return sorted.filter((task) => task.completed);
    }
    return sorted;
}

function toggleTask(id, completed) {
    const task = tasks.find((entry) => entry.id === id);
    if (!task) return;
    task.completed = completed;
    persist();
    render();
}

function removeTask(id) {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) return;
    tasks.splice(index, 1);
    persist();
    render();
}

function startEdit(id) {
    const task = tasks.find((entry) => entry.id === id);
    if (!task) return;
    const updated = prompt("Update task", task.title);
    if (updated === null) return;
    const trimmed = updated.trim();
    if (!trimmed) {
        removeTask(id);
        return;
    }
    task.title = trimmed;
    persist();
    render();
}

function updateSummary() {
    const total = tasks.length;
    const active = tasks.filter((task) => !task.completed).length;
    const completed = total - active;

    const [totalEl, activeEl, completedEl] = summary.querySelectorAll("strong");
    totalEl.textContent = total;
    activeEl.textContent = active;
    completedEl.textContent = completed;
}

function persist() {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
}

function loadTasks() {
    try {
        const raw = localStorage.getItem(storageKey);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.map((task) => ({
            id: typeof task.id === "string" ? task.id : generateId(),
            title: String(task.title ?? "Untitled"),
            completed: Boolean(task.completed),
            createdAt: Number(task.createdAt ?? Date.now()),
        }));
    } catch (error) {
        console.warn("Unable to load tasks", error);
        return [];
    }
}

render();