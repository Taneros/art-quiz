import View from '../view.js'
import Settings from '../settings.js'
import Utils from '../utilities.js'
import Model from '../model.js'

let resultsNode
let score

//TODO
/**
 *
 */

export default {
  setData(newItems, params_cat) {
    // console.log('newItems, params_cat:', newItems, params_cat)
    console.log('newItems, params_cat:', newItems, params_cat)
    resultsNode = document.getElementById('results')
  },
  render() {
    console.log('render cats author:')
    resultsNode.innerHTML = View.render('author_quiz_cats', {})

    const cards = document.getElementsByClassName('card')
    // console.log(cards)

    // categoriesMenuDropdown.classList.remove('visually-hidden')
    // console.log('categoriesMenuDropdown', categoriesMenuDropdown)

    Array.from(cards).forEach((card) => {
      console.log(card)
      const currentCat = card.id.slice(0, -2)
      console.log(currentCat)
      const cardScoreStorage = Settings.getLocalStorage(`score_auth_${currentCat}`) || Utils.resetScore()

      // get score tag
      const cardScoreWin = card.querySelector('span.badge.bg-success')
      const cardScoreLoss = card.querySelector('span.badge.bg-danger')
      console.log('success', cardScoreWin)
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
        console.log(e)
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
