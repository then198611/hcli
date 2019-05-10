import Button from './packages/button'
import CountDown from './packages/countdown'

const components = [
  Button,
  CountDown
]

const install = function (Vue) {
  if (install.installed) return
  components.map(component => {
    Vue.component(`ai${component.name}`, component)
  })
}

typeof window !== 'undefined' && window.Vue && install(window.Vue)

export default{
  version,
  install
}

export {
  Button,
  CountDown
}
