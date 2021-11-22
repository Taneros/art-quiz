import Controller from './controller.js'
import Utils from './utilities.js'

let catsDropdownMain

function getRoute() {
  const path = location.hash ? location.hash.slice(1) : ''
  const [quiz_type, category = 'categories'] = path.split('/')
  return { quiz_type, params: { category } }
}

function handleHash() {
  // handleSlash()
  const { quiz_type, params } = getRoute()
  // console.log('router working on hash ->', quiz_type, params)
  catsDropdownMain = document.querySelector('.nav-item.dropdown')
  if (quiz_type && params.category !== 'categories') {
    catsDropdownMain.classList.remove('visually-hidden')
    // console.log('catsDropdownMain', catsDropdownMain)
    const routeName = quiz_type + 'Route'
    Controller[routeName](params)
  } else {
    const routeName = 'catsRoute'
    catsDropdownMain.classList.add('visually-hidden')
    Controller[routeName](quiz_type, params)
  }
}

function handleSlash() {
  // if (location.hash.slice(1).split('/').length === 1) location.hash += `/avant-garde`
  const cats = document.querySelector('div.main-nav > ul > li.nav-item.dropdown > ul')
  // console.log('cats:', cats)
  // add event listener to drop-down menu
  cats.addEventListener('click', (e) => {
    // console.log(e.target)
    const catInnerHTML = e.target.id
    // console.log(catInnerHTML)
    const path = location.hash
    // console.log('path', path)
    const [hash, cat] = location.hash.slice(1).split('/')
    location.hash = `#${hash}/${catInnerHTML}`
  })
  handleHash()
}

export default {
  init() {
    addEventListener('hashchange', () => {
      // handleHash()
      handleSlash()
      const logo = document.querySelector('.game-logo')
      // logo.classList.add('visually-hidden')
      logo.style = 'display: none;'
      const carousel = document.querySelector('.carousel-wrapper')
      // carousel.classList.add('visually-hidden')
      carousel.style = 'display: none;'
    })
    // console.log('handleHash() ->', handleHash())
    // const { routeName, params } = handleHash()
    // console.log('routeName, params ->', routeName, params)
    // handleSlash()
  },
}

// TODO
/**
 *
 * getRoute use from utils
 *
 */
