const { resolve } = require('path')
const { stdin, stdout } = require('process')

require('colors')
// REPLACED BY INQUIRER
const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.log('========================================='.green)
    console.log('Seleccione una opción'.green)
    console.log('========================================='.green)
    console.log(`${'1.'.green} Crear Tarea`)
    console.log(`${'2.'.green} Listar Tareas`)
    console.log(`${'3.'.green} Completar Tarea(s)`)
    console.log(`${'4.'.green} Borrar Tarea`)
    console.log(`${'0.'.green} Salir \n`)

    const readline = require('readline').createInterface({
      input: stdin,
      output: stdout
    })

    readline.question('Seleccione una opción:', (opt) => {
      readline.close()
      resolve(opt)
    })
  })
}

const pausa = () => {
  return new Promise((resolve) => {
    const readline = require('readline').createInterface({
      input: stdin,
      output: stdout
    })

    readline.question(`\nPresione ${'ENTER'.green} para continuar \n`, () => {
      readline.close()
      resolve()
    })
  })
}

module.exports = {
  mostrarMenu,
  pausa
}
