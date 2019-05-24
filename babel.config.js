module.exports = function(api) {

  console.log('i am here')
  api.cache(true)

  const presets = [
    ["@babel/preset-env", {
      "modules": "umd",
      "debug": true
    }]
  ]
  const plugins = [
    "transform-vue-jsx"
  ]


  return{
    presets,
    plugins
  }
}
