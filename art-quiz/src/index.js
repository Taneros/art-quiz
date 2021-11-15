import { App } from './components/app/app.js'

const app = new App()

app.init()

// webpack HMR
if (module.hot) {
  module.hot.accept()
  module.hot.addStatusHandler((status) => {
    if (status === 'apply') {
      console.clear()
    }
  })
}
