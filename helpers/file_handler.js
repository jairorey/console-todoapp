const fs = require('fs')

const file = './data/tasks_file.json'

const writeFile = (data) => {
  fs.writeFileSync(file, JSON.stringify(data))
}

const load = () => {
  if (!fs.existsSync(file)) {
    return null
  }
  const dump = fs.readFileSync(file, { encoding: 'utf-8' })
  const data = JSON.parse(dump)
  return data
}

module.exports = {
  writeFile,
  load
}
