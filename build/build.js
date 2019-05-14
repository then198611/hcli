const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const getArgs = require('./arguments')

module.exports = (args) => {
  let { output, uglify } = args

  let res = getArgs(args)
  if (!res) return

  webpackConfig.entry = res.entryObj
  webpackConfig.mode = uglify ? 'production' : 'development'
  webpackConfig.output = {
    path: path.resolve(process.cwd(), './', output),
    filename: `[name].js`
  }

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
