import Model from './model.js'
import Author from './author-quiz/author.js'

let activeGameMode

let menuAuthorQuiz
let menuPictureQuiz

function setActiveGameMode(node) {
  if (activeGameMode) {
    activeGameMode.classList.remove('active')
  }
  activeGameMode = node
  activeGameMode.classList.add('active')
}

export default {
  async authorRoute(params) {
    menuAuthorQuiz = document.querySelector('[data-role="menu-author"]')
    // console.log(params.category)
    const authors = Model.getAuthor(params.category)
    console.log(authors)
    Author.setData(authors)
    Author.render()
    // TODO
    /**
     * specify how many authors to load?
     *
     */
    setActiveGameMode(menuAuthorQuiz)
  },

  async pictureRoute() {
    menuPictureQuiz = document.querySelector('[data-role="menu-pictures"]')
    const pictures = Model.getImg()
    // console.log(pictures)
    // TODO
    /**
     * specify how many pictures to load ?
     *
     *
     *
     */

    setActiveGameMode(menuPictureQuiz)
  },
}
