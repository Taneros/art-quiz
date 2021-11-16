import Controller from './controller.js'

function getRoute() {
  const path = location.hash ? location.hash.slice(1) : ''
  const [quiz_type, category = 'expressionism'] = path.split('/')
  return { quiz_type, params: { category } }
}

function handleHash() {
  const { quiz_type, params } = getRoute()
  console.log('router working on hash', quiz_type, params)
  if (quiz_type) {
    const routeName = quiz_type + 'Route'
    // TODO
    /**
     * add function on change of slash /realism
     */
    Controller[routeName](params)
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
