import Model from './model.js'
import Author from './author-quiz/author.js'
import Picture from './picture-quiz/picture.js'
import AuthorQuizCats from './author-quiz/author-quiz-cats.js'

let activeGameMode
let activeCat

// menu buttons
let menuAuthorQuiz
let menuPictureQuiz

// categories dropdown
let catDropdown
let catDropdownNode

function setActiveGameMode(quizBtnNode, catNode) {
  // console.log('controller: quizBtnNode, catNode', quizBtnNode, catNode)
  if (activeGameMode) {
    activeGameMode.classList.remove('active')
  }
  activeGameMode = quizBtnNode
  activeGameMode.classList.add('active')

  if (catNode) {
    if (activeCat) {
      activeCat.classList.remove('active')
    }
    activeCat = catNode
    activeCat.classList.add('active')
  }
}

export default {
  async authorRoute(params) {
    // console.log(params.category)
    // menuAuthorQuiz = document.querySelector('[data-role="menu-author"]')
    // set active cat
    catDropdown = document.querySelectorAll('div.main-nav > ul > li.nav-item.dropdown > ul > li')
    catDropdown.forEach((el, id) => {
      // console.log(el)
      if (el.firstChild.id === params.category) {
        // console.log('catdropdown same cat', el.firstChild)
        catDropdownNode = el.firstChild
      }
    })
    // get data from model
    const authors = Model.getAuthor(params.category)
    console.log('authorRoute authors', authors)
    // pass data to view
    Author.setData(authors, params.category)
    Author.render()

    setActiveGameMode(menuAuthorQuiz, catDropdownNode)
  },

  async pictureRoute(params) {
    console.log('Picure Route')
    // menuPictureQuiz = document.querySelector('[data-role="menu-pictures"]')
    // console.log('menuPictureQuiz', menuPictureQuiz)
    // set active cat

    catDropdown = document.querySelectorAll('div.main-nav > ul > li.nav-item.dropdown > ul > li')
    catDropdown.forEach((el, id) => {
      // console.log(el)
      if (el.firstChild.id === params.category) {
        // console.log('catdropdown same cat', el.firstChild)
        catDropdownNode = el.firstChild
      }
    })
    // get data from model
    const pictures = Model.getImg(params.category)
    console.log('pictureRoute pictures:', pictures)
    // pass data to view
    Picture.setData(pictures, params.category)
    Picture.render()

    setActiveGameMode(menuPictureQuiz, catDropdownNode)
  },
  async catsRoute(quiz_type, params) {
    console.log('catsRoute')
    menuAuthorQuiz = document.querySelector('[data-role="menu-author"]')
    menuPictureQuiz = document.querySelector('[data-role="menu-pictures"]')
    AuthorQuizCats.setData(quiz_type)
    AuthorQuizCats.render()

    if (quiz_type === 'author') {
      setActiveGameMode(menuAuthorQuiz)
      menuPictureQuiz.classList.add('visually-hidden')
    } else {
      setActiveGameMode(menuPictureQuiz)
      menuAuthorQuiz.classList.add('visually-hidden')
    }
  },
}
