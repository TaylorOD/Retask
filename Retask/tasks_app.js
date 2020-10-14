let tasks = getSavedTasks()

const filters = {
  searchText: "",
}

renderTasks(tasks, filters)

document.querySelector("#create-task").addEventListener("click", function (e) {
  const id = uuidv4()
  const timestamp = moment().valueOf()

  tasks.push({
    id: id,
    title: "",
    body: "",
    createdAt: timestamp,
    updatedAt: timestamp,
  })
  saveTasks(tasks)
  location.assign(`edit.html#${id}`)
})

document.querySelector("#search-text").addEventListener("input", function (e) {
  filters.searchText = e.target.value
  renderTasks(tasks, filters)
})

document.querySelector("#filter-by").addEventListener("change", function (e) {
  console.log(e.target.value)
})

// sync edit and index title storage
window.addEventListener("storage", function (e) {
  if (e.key === "tasks") {
    tasks = JSON.parse(e.newValue)
    renderTasks(tasks, filters)
  }
})
