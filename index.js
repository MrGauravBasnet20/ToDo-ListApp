// Getting elements from HTML
let input = document.getElementById('taskInput');
let action_btn = document.getElementById('addTaskBtn');
let tasklist = document.getElementById('taskList');

// Load tasks when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Function to load tasks from local storage
function loadTasks() {
  let tasks = getTaskFromLocal();
  tasks.forEach(task => {
    addTaskToDOM(task);
  });
}

// Function to get tasks from local storage
function getTaskFromLocal() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  return tasks;
}

// Add task when the button is clicked
action_btn.addEventListener('click', addTask);

function addTask() {
  let tasktext = input.value.trim();
  if (tasktext === '') {
    alert('Please Enter Any Task');
    return;
  }

  addTaskToDOM(tasktext); // Add task to the DOM
  saveTaskToLocal(tasktext); // Save task to local storage
  input.value = ''; // Clear the input field
}

// Function to add a task to the DOM
function addTaskToDOM(tasktext) {
  const li = document.createElement('li');

  // Create a span to hold the task text
  const taskSpan = document.createElement('span');
  taskSpan.textContent = tasktext;
  li.appendChild(taskSpan);

  // Create the Delete button
  const deletebtn = document.createElement('button');
  deletebtn.textContent = 'Delete';
  deletebtn.addEventListener('click', deleteTasks);

  // Create the Complete button
  const completeBtn = document.createElement('button');
  completeBtn.textContent = 'Complete';
  completeBtn.addEventListener('click', completeTasks);

  // Append buttons to the <li>
  li.appendChild(deletebtn);
  li.appendChild(completeBtn);

  // Append the <li> to the task list
  tasklist.appendChild(li);
}

// Function to save a task to local storage
function saveTaskToLocal(tasktext) {
  let tasks = getTaskFromLocal();
  tasks.push(tasktext);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to delete a task
function deleteTasks(event) {
  const li = event.target.parentElement; // Get the parent <li> element
  const tasktext = li.querySelector('span').textContent; // Get the task text from the <span>

  li.remove(); // Remove the <li> element from the DOM

  // Remove the task from local storage
  let tasks = getTaskFromLocal();
  tasks = tasks.filter(task => task !== tasktext); // Filter out the deleted task
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated tasks
}

// Function to mark a task as complete
function completeTasks(event) {
  const li = event.target.parentElement; // Get the parent <li> element
  li.classList.toggle('completed'); // Toggle the 'completed' class
}