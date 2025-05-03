const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

// Helper function to set a cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/`;
}

// Helper function to get a cookie
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

// Save the task list to a cookie
function saveTasksToCookie() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach((li) => {
    tasks.push({
      text: li.firstChild.textContent,
      checked: li.classList.contains("checked"),
    });
  });
  setCookie("taskList", JSON.stringify(tasks), 7); // Save for 7 days
}

// Load the task list from a cookie
function loadTasksFromCookie() {
  const taskListCookie = getCookie("taskList");
  if (taskListCookie) {
    const tasks = JSON.parse(taskListCookie);
    tasks.forEach((task) => {
      let li = document.createElement("li");
      li.innerHTML = task.text;
      if (task.checked) {
        li.classList.add("checked");
      }
      let span = document.createElement("span");
      span.innerHTML = "\u00d7";
      li.appendChild(span);
      taskList.appendChild(li);
    });
  }
}

// Add task function (modified to save tasks to cookie)
function addTask() {
  if (taskInput.value === "") {
    const dialog = document.createElement("dialog");
    dialog.textContent = "Debe escribir una tarea";
    document.body.appendChild(dialog);

    document.body.classList.add("blur");
    dialog.showModal();
    setTimeout(() => {
      dialog.close();
      dialog.remove();
      document.body.classList.remove("blur");
    }, 2300);
  } else {
    let li = document.createElement("li");
    li.innerHTML = taskInput.value;
    taskList.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    saveTasksToCookie(); // Save tasks after adding
  }
  taskInput.value = "";
}

// Event listener for task list (modified to save tasks to cookie)
taskList.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveTasksToCookie(); // Save tasks after toggling
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveTasksToCookie(); // Save tasks after removing
    }
  },
  false
);

// Load tasks from cookie on page load
document.addEventListener("DOMContentLoaded", loadTasksFromCookie);

