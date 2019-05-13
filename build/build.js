const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const glob = require('glob')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

module.exports = (args) => {
  let { input, output, exclude, uglify, retain } = args
  let entryObj = {}
  let files = glob.sync(`${input}/**/*.js`)
  if (!files.length) {
    console.warn('this file or dir is not exist, please check your input')
    return false
  }
  files.forEach((o) => {
    let key = retain ? o.replace('.js', '') : o.replace(`${input}/`, '').replace('.js', '')
    entryObj[key] = `./${o}`
  })
  webpackConfig.entry = entryObj
  webpackConfig.mode = uglify ? 'production' : 'development'
  webpackConfig.output = {
    path: path.resolve(process.cwd(), './', output),
    filename: `[name].js`
  }
  if (!input) {
    console.warn('please build with input dir')
  } else {
    const spinner = ora('building...')
    spinner.start()
    rm(output, err => {
      if (err) throw err
      webpack(webpackConfig, function(err, stats) {
        spinner.stop()
        console.log(chalk.cyan('  Build complete.\n'))
        if (err) {
          throw err
          console.error('please check errors')
        } else {
          process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
          }) + '\n\n')
          console.log(chalk.yellow(
            `please see files in ${output}`
          ))
        }
      })
    })
  }
}
