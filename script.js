let tasks = [];
let editIndex = -1;

const form = document.getElementById("task-form");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const priorityInput = document.getElementById("priority");
const taskList = document.getElementById("task-list");

form.addEventListener("submit", function (e) {
  e.preventDefault();//منع الافتراضي

  const title = titleInput.value.trim();
  //.trim():يزيل الفراغات الزائدة من البداية والنهاية (مثلاً إذا كتب المستخدم 
  //" Task 1 " تصبح "Task 1").


  const description = descriptionInput.value.trim();
  const priority = priorityInput.value;

  if (!title) {
    alert("Title cannot be empty.");
    return;
  }

  if (editIndex === -1) {
    tasks.push({ title, description, priority });
  } else {//click edite 
    tasks[editIndex] = { title, description, priority };
    editIndex = -1;
    form.querySelector("button").textContent = "Add Task";
  }

  localStorage.setItem("Task", JSON.stringify(tasks));
  form.reset();
  displayTasks();
});

if (localStorage.Task != null) {
  tasks = JSON.parse(localStorage.Task);//convert text to ARR
} else {
  tasks = [];
}
displayTasks();

function displayTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${task.title}</td>
      <td>${task.description}</td>
      <td>${task.priority}</td>
      <td class="actions">
        <button class="edit-btn" onclick="editTask(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
      </td>
    `;

    taskList.appendChild(row);
  });
}

window.editTask = function (index) {
  const task = tasks[index];
  titleInput.value = task.title;
  descriptionInput.value = task.description;
  priorityInput.value = task.priority;
  editIndex = index;
  form.querySelector("button").textContent = "Update Task";
};

window.deleteTask = function (index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    localStorage.setItem("Task", JSON.stringify(tasks)); // ✅ تحديث التخزين
    displayTasks();
  }
};
