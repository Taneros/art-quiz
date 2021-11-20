import View from '../view.js'
import Settings from '../settings.js'
import Utils from '../utilities.js'
import Model from '../model.js'

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
let questionPack
let currentQuestionCardNum
let score

function getCurrentQuestionSet(params) {
  return questionPack[params]
}

function checkDoublicates(newItems) {
  let noDublicates = newItems.reduce((arr, item) => {
    const removed = arr.filter((i) => i['author'] !== item['author'])
    return [...removed, item]
  }, [])
  if (noDublicates.length < 10) {
    console.log('less than 10 getting more')
    noDublicates.push(Model.getRandom())
    console.log(noDublicates)
    checkDoublicates(noDublicates)
    // checkDoubles(noDublicates.push(Model.getRandom()))
  }
  return noDublicates
}

export default {
  // save info from Model for rendering
  setData(newItems, params_cat) {
    // console.log('newItems, params_cat:', newItems, params_cat)
    newItems = checkDoublicates(newItems)
    console.log('newItems, params_cat:', newItems, params_cat)
    resultsNode = document.getElementById('results')
    category = params_cat
    items = Settings.getLocalStorage(`items_auth_${category}`) || []
    questionPack = Settings.getLocalStorage(`questionPack_auth_${category}`) || []
    score = Settings.getLocalStorage(`score_auth_${category}`) || Utils.resetScore()
    currentQuestionCardNum = 1

    if (!items.length) {
      items = Utils.sliceTen(newItems)
      // write current set to getLocalStorage
      Settings.setLocalStorage(`items_auth_${category}`, items)
    }

    // generate 10 packs of questions for current category
    if (!questionPack.length) {
      items.forEach((el, idx) => {
        // console.log('allAuthors el, idx ->', el, idx)
        const singleQuestionData = {}
        // grab an image
        singleQuestionData.img = el.imageNum
        // console.log('correct author', el.author)
        singleQuestionData.correctAnswer = el.author
        // generate 3 extra
        Utils.generateUnique(el.author, items).forEach((el, idx) => {
          singleQuestionData[`answer-${idx + 1}`] = el
        })
        questionPack.push(singleQuestionData)
      })
      // store locally
      Settings.setLocalStorage(`questionPack_auth_${category}`, questionPack)
    }
  },

  /******************* R E N D E R *******************/

  render() {
    // setting current author (-1 to adjust for array idx)
    console.log('render getCurrentQuestionSet:', getCurrentQuestionSet(currentQuestionCardNum - 1))
    // render page
    resultsNode.innerHTML = View.render('author', getCurrentQuestionSet(currentQuestionCardNum - 1))
    // console.log(`score_auth_${category}`)
    // score = Settings.getLocalStorage(`score_auth_${category}`) || Utils.resetScore()
    // console.log('render-score:', score)

    // TODO
    /**
     *
     */

    let myQuizModalBody = document.querySelector('.modal-body')
    const myQuizModal = document.getElementById('quiz-modal')
    const myQuizModalCloseBtn = document.getElementById('quiz-modal-close-btn')
    const myQuizModalPrevBtn = document.getElementById('quiz-modal-prev-btn')
    const myQuizModalNextBtn = document.getElementById('quiz-modal-next-btn')
    const activateQuizModal = new bootstrap.Modal(myQuizModal)

    myQuizModalCloseBtn.addEventListener('click', () => {
      this.render()
    })

    myQuizModalPrevBtn.addEventListener('click', () => {
      let event = new Event('click')
      prevBtn.dispatchEvent(event)
    })

    // modal prev btn
    if (currentQuestionCardNum === 1) {
      myQuizModalPrevBtn.classList.add('disabled')
    } else {
      myQuizModalPrevBtn.classList.remove('disabled')
    }

    // modal next btn
    myQuizModalNextBtn.addEventListener('click', () => {
      let event = new Event('click')
      nextBtn.dispatchEvent(event)
    })
    if (currentQuestionCardNum === 10) {
      myQuizModalNextBtn.classList.add('disabled')
    } else {
      myQuizModalNextBtn.classList.remove('disabled')
    }

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
        if (el.innerHTML === items.filter((el) => el.imageNum === getCurrentQuestionSet(currentQuestionCardNum - 1).img)[0].author) {
          // console.log('correct!')
          myQuizModalBody.classList.add('correct')
          el.classList.add('correct')
          answerResult.el_id = el.id
          answerResult.correct = 1
        } else {
          myQuizModalBody.classList.add('notcorrect')
          el.classList.add('notcorrect')
          answerResult.el_id = el.id
          answerResult.correct = 0
        }
        if (!score[currentQuestionCardNum - 1].el_id) {
          score[currentQuestionCardNum - 1].el_id = answerResult.el_id
          score[currentQuestionCardNum - 1].correct = answerResult.correct
          Settings.setLocalStorage(`score_auth_${category}`, score)
        }
        activateQuizModal.show()
        // this.render()
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
