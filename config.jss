const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

let config = null

module.exports = () => {
  if (config !== null) {
    return config
  }

  const configData = fs.readFileSync(path.join(__dirname, 'config.yml'), { encoding: 'utf8' })
  const loadedConfig = yaml.load(configData)

  // Let's do some super simple sanity checks
  const courseIds = new Set()
  loadedConfig.courses.forEach(({ id, name, shortname, org }, idx) => {
    // Ensure all required properties are present
    const missing = [id, name, shortname, org].some(i => i === undefined)
    if (missing) {
      throw new Error(`Course at index ${idx} is missing one or more properties`)
    }

    // Ensure all course IDs are unique
    if (courseIds.has(id)) {
      throw new Error(`Duplicate course id: ${id}`)
    }
    courseIds.add(id)
  })

  // If we got here without throwing an exception, we're good!
  config = loadedConfig;
  return config
}