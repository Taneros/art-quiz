import Controller from './controller.js'
import Utils from './utilities.js'

function getRoute() {
  const path = location.hash ? location.hash.slice(1) : ''
  const [quiz_type, category = 'avant-garde'] = path.split('/')
  return { quiz_type, params: { category } }
}

function handleHash() {
  // TODO
  /**
   *
   */
  if (location.hash.slice(1).split('/').length === 1) location.hash += `/renaissance`
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

function handleSlash() {
  const cats = document.querySelector('div.main-nav > ul > li.nav-item.dropdown > ul')
  // console.log('cats:', cats)
  cats.addEventListener('click', (e) => {
    // console.log(e.target)
    const catInnerHTML = e.target.id
    // console.log(catInnerHTML)
    const path = location.hash
    console.log('path', path)
    const [hash, cat] = location.hash.slice(1).split('/')
    location.hash = `#${hash}/${catInnerHTML}`
    handleHash()
  })
}

export default {
  init() {
    addEventListener('hashchange', handleHash)
    // console.log('handleHash() ->', handleHash())
    // const { routeName, params } = handleHash()
    // console.log('routeName, params ->', routeName, params)
    handleSlash()
  },
}

// TODO
/**
 *
 * getRoute use from utils
 *
 */
