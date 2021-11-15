import Controller from './controller.js'

function getRoute() {
  const path = location.hash ? location.hash.slice(1) : ''
  return path
}

function handleHash() {
  const path = getRoute()
  if (path) {
    const routeName = path + 'Route'
    Controller[routeName]()
  }
  console.log('router working on hash', path)
}

export default {
  init() {
    addEventListener('hashchange', handleHash)
    handleHash()
  },
}
