import Controller from './controller.js'
import Utils from './utilities.js'

function getRoute() {
  const path = location.hash ? location.hash.slice(1) : ''
  const [quiz_type, category = 'expressionism'] = path.split('/')
  return { quiz_type, params: { category } }
}

function handleHash() {
  // TODO
  /**
   *
   */
  const { quiz_type, params } = getRoute()
  console.log('router working on hash ->', quiz_type, params)
  if (quiz_type) {
    const routeName = quiz_type + 'Route'
    Controller[routeName](params)
  } else {
    const routeName = 'mainRoute'
    Controller[routeName](params)
  }
}

export default {
  init() {
    addEventListener('hashchange', handleHash)
    handleHash()
    // console.log('handleHash() ->', handleHash())
    // const { routeName, params } = handleHash()
    // console.log('routeName, params ->', routeName, params)
  },
}

// TODO
/**
 *
 * getRoute use from utils
 *
 */
