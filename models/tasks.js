const Task = require('./task')

class Tasks {
  _list = {
    abc: 123
  }
  constructor() {
    this._list = {}
  }

  get listadoArr() {
    const arr = []
    Object.keys(this._list).forEach((key) => {
      const task = this._list[key]
      arr.push(task)
    })
    return arr
  }

  loadTasksfromArray(tasksArr = []) {
    tasksArr.forEach((task) => {
      this._list[task.id] = task
    })
  }

  newTask(desc = '') {
    const task = new Task(desc)
    this._list[task.id] = task
  }

  listTasks() {
    this.listadoArr.forEach((task, i) => {
      const index = `${i + 1}`.green
      const { desc, done } = task
      const state = done ? 'Completado'.green : 'Pendiente'.red
      console.log(`${index} ${desc} :: ${state} `)
    })
  }

  deleteTask(id = '') {
    if (this._list[id]) {
      delete this._list[id]
    }
  }
}

module.exports = Tasks
