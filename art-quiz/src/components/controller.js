import Model from './model.js'
import Author from './author-quiz/author.js'

let activeGameMode

function setActiveGameMode(params) {
  //TODO
  /**
   * get button from DOM and add class active
   *
   */
}

export default {
  async authorRoute() {
    const artists = Model.getAuthor()
    console.log(artists)
    Author.setData(artists)
    Author.render()
    // TODO
    /**
     * specify how many authors to load
     */

    setActiveGameMode('authorQuiz')
  },

  async pictureRoute() {
    const pictures = Model.getImg()
    console.log(pictures)
    // TODO
    /**
     * specify how many pictures to load
     *
     *
     *
     */

    setActiveGameMode('pictureQuiz')
  },
}
