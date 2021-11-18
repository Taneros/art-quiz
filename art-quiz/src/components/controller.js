import Model from './model.js'
import Author from './author-quiz/author.js'

let activeGameMode

// menu buttons
let menuAuthorQuiz
let menuPictureQuiz

// categories dropdown
let catDropdown
let catDropdownNode

function setActiveGameMode(node) {
  if (activeGameMode) {
    activeGameMode.classList.remove('active')
  }
  activeGameMode = node
  activeGameMode.classList.add('active')
}

export default {
  async authorRoute(params) {
    // console.log(params.category)
    menuAuthorQuiz = document.querySelector('[data-role="menu-author"]')
    // set active cat
    catDropdown = document.querySelectorAll('div.main-nav > ul > li.nav-item.dropdown > ul > li')
    catDropdown.forEach((el, id) => {
      // console.log(el)
      if (el.firstChild.id === params.category) {
        console.log('catdropdown same cat', el.firstChild)
        catDropdownNode = el.firstChild
      }
    })

    const authors = Model.getAuthor(params.category)
    console.log(authors)
    Author.setData(authors, params.category)
    Author.render()
    // TODO
    /**
     * specify how many authors to load?
     *
     */
    setActiveGameMode(menuAuthorQuiz, params.category)
    setActiveGameMode(catDropdownNode)
  },

  async pictureRoute(params) {
    console.log('picure route')
    menuPictureQuiz = document.querySelector('[data-role="menu-pictures"]')
    console.log('menuPictureQuiz', menuPictureQuiz)
    // set active cat

    catDropdown = document.querySelectorAll('div.main-nav > ul > li.nav-item.dropdown > ul > li')
    catDropdown.forEach((el, id) => {
      // console.log(el)
      if (el.firstChild.id === params.category) {
        console.log('catdropdown same cat', el.firstChild)
        catDropdownNode = el.firstChild
      }
    })
    const pictures = Model.getImg(params.category)
    console.log('pictureRoute pictures:', pictures)
    // TODO
    /**
     * specify how many pictures to load ?
     *
     */

    setActiveGameMode(menuPictureQuiz)
    setActiveGameMode(catDropdownNode)
  },
  async mainRoute() {},
}
