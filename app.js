const {
  inquirerMenu,
  pausa,
  readInput,
  selectItem,
  confirmation
} = require('./helpers/inquirer')
const { writeFile, load } = require('./helpers/file_handler')
const Tasks = require('./models/tasks')

require('colors')

const main = async () => {
  let opt = ''
  const tasks = new Tasks()

  const loadTasks = load()

  if (loadTasks) {
    tasks.loadTasksfromArray(loadTasks)
  }

  do {
    opt = await inquirerMenu()
    switch (opt) {
      case 1:
        const desc = await readInput(`Descripción:`)
        tasks.newTask(desc)
        break
      case 2:
        if (tasks.countTasks > 0) {
          tasks.listTasks()
        } else {
          console.log(`No existen tareas para listar`.red)
        }
        break
      case 4:
        if (tasks.countTasks > 0) {
          const id = await selectItem(tasks.listadoArr)
          if (id !== 0) {
            const ok = await confirmation('Está seguro?')
            if (ok) {
              tasks.deleteTask(id)
              console.log('Tarea Eliminada Satisfactoriamente')
            }
          }
        } else {
          console.log(`No existen tareas para borrar`.red)
        }
        break
    }

    writeFile(tasks.listadoArr)

    if (opt !== 0) await pausa()
  } while (opt !== 0)
}

main()
