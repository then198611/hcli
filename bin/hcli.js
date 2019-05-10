#!/usr/bin/env node

const {version} = require('../package.json')
const program = require('commander')
const build = require('../build/build')
const yargs = require('yargs')
const options = {
  'i': {
    alias: 'input',
    describe: 'input dir',
    type: 'string'
  },
  'r': {
    alias: 'retain',
    describe: 'retain input dir',
    type: 'boolean',
    default: false
  },
  'o': {
    alias: 'output',
    describe: 'output dir',
    type: 'string',
    default: 'lib'
  },
  'e': {
    alias: 'exclude',
    describe: 'exclude dir or file',
    type: 'string',
    default: ''
  },
  'u': {
    alias: 'uglify',
    describe: 'uglify or not',
    type: 'boolean',
    default: true
  }
}

for (let key in options) {
  yargs.option(key, options[key])
}

const argv = yargs.argv

program
// 版本信息
  .version(version, '-v, --version')
  // 用法说明
  .usage('<file ...> [options]')
  // 选择名 选项描述 默认值
  // 选项 可以带有一个参数 可以通过 program.copy 获取该选项信息
  // 如果没有参数 该值为 true
  .option('-c, --config', `config file`)
  .option('-i, --input', `input dir or file`)
  .option('-r, --retain', `retain input dir or file`)
  .option('-o, --output', `output dir`)
  .option('-u, --uglify', `if uglify`)
  .option('-e, --exclude', `exclude dir`)
  .action(() => {
    build(argv)
  })
  .parse(process.argv)
