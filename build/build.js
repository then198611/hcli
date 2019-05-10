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
  files.forEach((o) => {
    let key = retain ? o.replace('.js', '') : o.replace(`${input}/`, '').replace('.js', '')
    entryObj[key] = `./${o}`
  })
  console.log(entryObj)
  webpackConfig.entry = entryObj
  webpackConfig.mode = uglify ? 'production' : 'development'
  webpackConfig.output = {
    path: path.resolve(process.cwd(), './', output),
    filename: `[name].js`
  }
  if (!input) {
    console.warn('please build with input dir')
  } else {
    const spinner = ora('building for production...')
    spinner.start()
    rm(output, err => {
      spinner.stop()
      if (err) throw err
      webpack(webpackConfig, function(err, stats) {
        if (err) throw err
        process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n\n')

        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
          `please see files in ${output}`
        ))
      })
    })
  }
}
