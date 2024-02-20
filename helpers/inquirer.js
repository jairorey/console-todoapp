require('colors')
const inquirer = require('inquirer')

const inquirerMenu = async () => {
  const question = [
    {
      type: 'list',
      name: 'list',
      message: 'que desea hacer?',
      choices: [
        {
          value: 1,
          name: `${'1'.green}. Crear Tarea`
        },
        {
          value: 2,
          name: `${'2'.green}. Listar Tareas`
        },
        {
          value: 3,
          name: `${'3'.green}. Completar Tarea(s)`
        },
        {
          value: 4,
          name: `${'4'.green}. Borrar Tareas`
        },
        {
          value: 0,
          name: `${'0'.green}. Salir`
        }
      ]
    }
  ]

  console.clear()
  console.log('========================================='.green)
  console.log('Seleccione una opción'.green)
  console.log('========================================='.green)
  const { list } = await inquirer.prompt(question)
  return list
}

const pausa = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'ENTER'.green} para continuar`
    }
  ]
  console.log('\n')
  await inquirer.prompt(question)
}

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'ingrese un valor'
        }
        return true
      }
    }
  ]
  console.log('\n')
  const { desc } = await inquirer.prompt(question)
  return desc
}

const formattedList = async (listArr = []) => {
  const flist = listArr.forEach((task) => {
    return `{
      "value:" ${task.id},
      "name:" ${task.desc},
    }`
  })

  const question = [
    {
      type: 'list',
      name: 'list_formatted',
      message: 'Lista de Tareas',
      choices: [flist]
    }
  ]

  console.clear()
  console.log(flist)
  console.log('========================================='.green)
  const { list } = await inquirer.prompt(question)
  return list
}

const selectItem = async (arr = []) => {
  const choices = arr.map((item, idx) => {
    return {
      value: item.id,
      name: `${idx + 1}. ${item.desc}`
    }
  })

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancelar'
  })

  const items = [
    {
      type: 'list',
      name: 'selected',
      message: 'que item desea seleccionar?',
      choices
    }
  ]
  const { selected } = await inquirer.prompt(items)
  return selected
}

const confirmation = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'confirm',
      message
    }
  ]
  const { confirm } = await inquirer.prompt(question)
  return confirm
}

const checklistCompleteTasks = async (arr = []) => {
  const choices = arr.map((item, idx) => {
    return {
      value: item.id,
      name: `${idx + 1}. ${item.desc}`,
      checked: item.done ? true : false
    }
  })

  const items = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'selecciones',
      choices
    }
  ]
  const { ids } = await inquirer.prompt(items)
  return ids
}

module.exports = {
  inquirerMenu,
  pausa,
  readInput,
  formattedList,
  selectItem,
  confirmation,
  checklistCompleteTasks
}
