/* global getSavedTasks */

const titleEl = document.querySelector("#task_title")
const bodyEl = document.querySelector("#task_body")
const updatedAtEl = document.querySelector("#task_updatedAt")
const removeEl = document.querySelector("#remove_task")
const taskID = location.hash.substring(1)

let tasks = getSavedTasks()
let task = tasks.find(function (task) {
  return task.id === taskID
})

if (task === undefined) {
  location.assign("index.html")
}

titleEl.value = task.title
updatedAtEl.textContent = updateLastEdited(task.updatedAt)
bodyEl.value = task.body

// save new title for task to local storage using edit page
titleEl.addEventListener("input", function (e) {
  task.title = e.target.value
  task.updatedAt = moment().valueOf()
  updatedAtEl.textContent = updateLastEdited(task.updatedAt)
  saveTasks(tasks)
})

// save new body for task to local storage using edit page
bodyEl.addEventListener("input", function (e) {
  task.body = e.target.value
  task.updatedAt = moment().valueOf()
  updatedAtEl.textContent = updateLastEdited(task.updatedAt)
  saveTasks(tasks)
})

// remove task on edit page and redirect to home page
removeEl.addEventListener("click", function () {
  removeTask(task.id)
  saveTasks(tasks)
  location.assign("index.html")
})

// syncs across edit pages
window.addEventListener("storage", function (e) {
  if (e.key === "tasks") {
    tasks = JSON.parse(e.newValue)
    task = tasks.find(function (task) {
      return task.id === taskID
    })

    if (task === undefined) {
      location.assign("index.html")
    }

    titleEl.value = task.title
    updatedAtEl.value = task.updatedAt
    updatedAtEl.textContent = updateLastEdited(task.updatedAt)
    bodyEl.value = task.body
  }
})