/**
 * 处理输入参数
 * @type {glob}
 */
const glob = require('glob')

module.exports = (args) => {
  let { input, retain } = args

  // 入口文件
  let entryObj = {}

  if (!input.length) {
    console.warn('please build with input dir')
    return false
  }

  input.forEach((value) => {
    // 判断输入文件是js文件还是目录
    let files = glob.sync(value.endsWith('.js') ? `${value}` : `${value}/**/*.js`)

    if (!files.length) {
      console.warn('this file or dir is not exist, please check your input')
      return false
    }

    files.forEach((o) => {
      let key = retain ? o.replace('.js', '') : o.replace(`${value}/`, '').replace('.js', '')
      entryObj[key] = `./${o}`
    })
  })

  return {
    entryObj
  }
}
