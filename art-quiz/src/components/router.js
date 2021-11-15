import Controller from './controller.js'

function getRoute() {
  const path = location.hash ? location.hash.slice(1) : ''
  return path
}

function handleHash() {
  const path = getRoute()
  console.log('router working on hash', path)
  if (path) {
    const routeName = path + 'Route'
    // TODO
    /**
     * add function on change of slash /realism
     */
    Controller[routeName]('expressionism')
  }
}

export default {
  init() {
    addEventListener('hashchange', handleHash)
    handleHash()
  },
}

// TODO
/**
 *
 * add listener path change / slash
 *
 */
