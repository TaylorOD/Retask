/*  global tasks, filters */

// read existing tasks from localstorage
const getSavedTasks = function () {
  const tasksJSON = localStorage.getItem("tasks")

  if (tasksJSON != null) {
    return JSON.parse(tasksJSON)
  } else {
    return []
  }
}

// save tasks to local storage
const saveTasks = function (tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

// remove task from list
const removeTask = function (id) {
  const taskIndex = tasks.findIndex(function (task) {
    return task.id === id
  })

  if (taskIndex > -1) {
    tasks.splice(taskIndex, 1)
  }
}


// generate DOM for a task
const generateTaskDom = function (task) {
  const taskEl = document.createElement("div")
  const textEl = document.createElement("a")
  const button = document.createElement("button")

  // setup the remove task button
  button.textContent = "x"
  taskEl.appendChild(button)
  button.addEventListener("click", function () {
    removeTask(task.id)
    saveTasks(tasks)
    renderTasks(tasks, filters)
  })

  // setup the task title text
  if (task.title.length > 0) {
    textEl.textContent = task.title
  } else {
    textEl.textContent = "Unnamed task"
  }
  textEl.setAttribute("href", `edit.html#${task.id}`)
  taskEl.appendChild(textEl)

  return taskEl

}

// Render application tasks
const renderTasks = function (tasks, filters) {
  const filteredTasks = tasks.filter(function (task) {
    return task.title.toLowerCase().includes(filters.searchText.toLowerCase())
  })

  document.querySelector("#tasks").innerHTML = ""

  filteredTasks.forEach(function (task) {
    const taskEl = generateTaskDom(task)
    document.querySelector("#tasks").appendChild(taskEl)
  })
}

// Generate the last edited message
const updateLastEdited = function (timestamp) {
  return `Last edited ${moment(timestamp).fromNow()}`
}