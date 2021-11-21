import View from '../view.js'
import Settings from '../settings.js'
import Utils from '../utilities.js'
import Model from '../model.js'

let resultsNode
let quizType
const cardImg = {
  author: {
    img1: '41',
    img2: '43',
    img3: '58',
    img4: '10',
    img5: '14',
    img6: '8',
    img7: '4',
    img8: '0',
    img9: '2',
    img10: '6',
    img11: '47',
    img12: '31',
  },
  picture: {
    img1: '59',
    img2: '112',
    img3: '76',
    img4: '83',
    img5: '95',
    img6: '19',
    img7: '26',
    img8: '39',
    img9: '54',
    img10: '20',
    img11: '60',
    img12: '81',
  },
}
let currentCardSet

//TODO
/**
 *
 * add card fade if all nulls (not played yet)
 *
 */

export default {
  setData(quiz_type, params_cat) {
    // console.log('newItems, params_cat:', newItems, params_cat)
    console.log('quiz_type, params_cat:', quiz_type, params_cat)
    resultsNode = document.getElementById('results')
    if (quiz_type === 'author') {
      currentCardSet = cardImg.author
      quizType = 'auth'
    } else {
      currentCardSet = cardImg.picture
      quizType = 'pic'
    }
  },
  render() {
    console.log('render cats author:')
    resultsNode.innerHTML = View.render('author_quiz_cats', currentCardSet)

    const cards = document.getElementsByClassName('card')
    // console.log(cards)

    // categoriesMenuDropdown.classList.remove('visually-hidden')
    // console.log('categoriesMenuDropdown', categoriesMenuDropdown)

    Array.from(cards).forEach((card) => {
      // console.log(card)
      const currentCat = card.id.slice(0, -2)
      // console.log(currentCat)
      const cardScoreStorage = Settings.getLocalStorage(`score_${quizType}_${currentCat}`) || Utils.resetScore()

      // get score tag
      const cardScoreWin = card.querySelector('span.badge.bg-success')
      const cardScoreLoss = card.querySelector('span.badge.bg-danger')
      // console.log('success', cardScoreWin)
      // count wins losses
      const currectCardScore = { wins: 0, losses: 0, nulls: 0 }
      cardScoreStorage.forEach((score, idx) => {
        const correct = score.correct
        if (correct) currectCardScore.wins += 1
        else if (correct === null) currectCardScore.nulls += 1
        else currectCardScore.losses += 1
      })
      // render score
      cardScoreWin.innerHTML = `${currectCardScore.wins}`
      cardScoreLoss.innerHTML = `${currectCardScore.losses}`

      // add event listener
      card.addEventListener('click', (e) => {
        // console.log(e)
        const hash = location.hash.slice(1)
        location.hash = `#${hash}/${currentCat}`
      })
    })

    //TODO
    /**
     *
     *
     *
     * add event liteners to each card
     *
     * on click change hash -> router
     *
     * add style no border under pressed card
     *
     * make categories frop down visible again
     *
     * hide pictures quiz button
     *
     * make this js file universal
     *
     */
  },
}
