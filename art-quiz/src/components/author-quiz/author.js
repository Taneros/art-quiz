import View from '../view.js'
import Settings from '../settings.js'
import Utils from '../utilities.js'

//TODO
/**
 *
 */

// let { quiz_type, params } = Utils.getRoute()
// console.log('params ->', params.category)
let category
let resultsNode
let prevBtn
let nextBtn
let answerBtns
let items
let allAuthorData
let currentQuestionCardNum
let score

function currentAuthor(params) {
  return allAuthorData[params]
}

export default {
  // save info from Model for rendering
  setData(newItems, params_cat) {
    console.log('newItems, params_cat:', newItems, params_cat)
    resultsNode = document.getElementById('results')
    category = params_cat
    items = Settings.getLocalStorage(`items_${category}`) || []
    allAuthorData = Settings.getLocalStorage(`allAuthorData_${category}`) || []
    score = Settings.getLocalStorage(`score_${category}`) || Utils.resetScore()
    currentQuestionCardNum = 1

    if (!items.length) {
      items = Utils.sliceTen(newItems)
      // write current set to getLocalStorage
      Settings.setLocalStorage(`items_${category}`, items)
    }

    // generate 10 packs of questions for current category
    if (!allAuthorData.length) {
      items.forEach((el, idx) => {
        // console.log('allAuthors el, idx ->', el, idx)
        const singleQuestionData = {}
        // grab an image
        singleQuestionData.img = el.imageNum
        // console.log('correct author', el.author)
        // generate 3 extra
        Utils.generateUnique(el.author).forEach((el, idx) => {
          singleQuestionData[`answer-${idx + 1}`] = el
        })
        allAuthorData.push(singleQuestionData)
      })
      // store locally
      Settings.setLocalStorage(`allAuthorData_${category}`, allAuthorData)
    }
  },

  /******************* R E N D E R *******************/

  async render() {
    // setting current author (-1 to adjust for array idx)
    console.log('render:', currentAuthor(currentQuestionCardNum - 1))
    // render page
    resultsNode.innerHTML = View.render('author', currentAuthor(currentQuestionCardNum - 1))
    console.log(`score_${category}`)
    score = Settings.getLocalStorage(`score_${category}`) || Utils.resetScore()
    console.log('render-score:', score)

    // TODO
    /**
     *
     */

    // render pagination put in separate function?

    score.forEach((el, idx) => {
      // console.log('el.correct', el.correct)
      if (el.correct === 1) {
        document.getElementById(`pg_${idx + 1}`).classList.add('correct')
      } else if (el.correct !== null) {
        document.getElementById(`pg_${idx + 1}`).classList.add('notcorrect')
      }
      document.getElementById(`pg_${currentQuestionCardNum}`).parentNode.classList.add('scale')
    })

    // console.log('resultsNode', resultsNode)
    // prev and next button iteration
    prevBtn = document.getElementById('prev')
    nextBtn = document.getElementById('next')

    // answer buttons
    answerBtns = document.getElementsByClassName('answers__answer')
    Array.from(answerBtns).forEach((el) => {
      // render btn color
      if (score[currentQuestionCardNum - 1].correct === 1) {
        if (el.id === score[currentQuestionCardNum - 1].el_id) {
          el.classList.add('correct')
        }
      } else {
        if (el.id === score[currentQuestionCardNum - 1].el_id) {
          el.classList.add('notcorrect')
        }
      }
      el.addEventListener('click', () => {
        let answerResult = { el_id: '', correct: 0 }
        // console.log(el.innerHTML)
        if (el.innerHTML === items.filter((el) => el.imageNum === currentAuthor(currentQuestionCardNum - 1).img)[0].author) {
          // console.log('correct!')
          el.classList.add('correct')
          answerResult.el_id = el.id
          answerResult.correct = 1
        } else {
          el.classList.add('notcorrect')
          answerResult.el_id = el.id
          answerResult.correct = 0
        }
        if (!score[currentQuestionCardNum - 1].el_id) {
          score[currentQuestionCardNum - 1].el_id = answerResult.el_id
          score[currentQuestionCardNum - 1].correct = answerResult.correct
          Settings.setLocalStorage(`score_${category}`, score)
        }
        this.render()
      })
    })
    // console.log(answerBtns)

    // event listeners for prev next buttons
    prevBtn.addEventListener('click', () => {
      if (currentQuestionCardNum < 11 && currentQuestionCardNum > 1) {
        currentQuestionCardNum--
        // console.log(currentQuestionCardNum)
        // take next question from the pack
        this.render()
      }
    })
    nextBtn.addEventListener('click', () => {
      if (currentQuestionCardNum < 10 && currentQuestionCardNum >= 1) {
        currentQuestionCardNum++
        // console.log(currentQuestionCardNum)
        this.render()
      }
    })
  },
}
