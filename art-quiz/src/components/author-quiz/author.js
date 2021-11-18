// import templates from '../templates/templates.js'
import View from '../view.js'
import Settings from '../settings.js'
import Utils from '../utilities.js'

//TODO
/**
 * move to utilities reused functions between quiz types:
 *
 * shiffleArr()
 * getRndItem()
 * generateUnique()
 * sliceTen()
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

function shuffleArr(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function getRndItem() {
  const itemsLength = Object.keys(items).length
  const random = Math.floor(Math.random() * itemsLength)
  // console.log(random)
  return items[random].author
}

function generateUnique(params) {
  let mySet = new Set().add(params)
  while (mySet.size < 4) {
    mySet.add(getRndItem())
  }
  // console.log(mySet)
  return shuffleArr(Array.from(mySet))
}

function sliceTen(params) {
  return params.slice(0, 10)
}

function currentAuthor(params) {
  //TODO
  /**
   *
   */
  return allAuthorData[params]
}

function resetScore() {
  return [
    { question: 0, el_id: '', correct: null },
    { question: 1, el_id: '', correct: null },
    { question: 2, el_id: '', correct: null },
    { question: 3, el_id: '', correct: null },
    { question: 4, el_id: '', correct: null },
    { question: 5, el_id: '', correct: null },
    { question: 6, el_id: '', correct: null },
    { question: 7, el_id: '', correct: null },
    { question: 8, el_id: '', correct: null },
    { question: 9, el_id: '', correct: null },
  ]
}

export default {
  // save info from Model for rendering
  setData(newItems, params_cat) {
    console.log('newItems, params_cat:', newItems, params_cat)
    resultsNode = document.getElementById('results')
    category = params_cat
    items = Settings.getLocalStorage(`items_${category}`) || []
    allAuthorData = Settings.getLocalStorage(`allAuthorData_${category}`) || []
    score = Settings.getLocalStorage(`score_${category}`) || resetScore()
    currentQuestionCardNum = 1
    // TODO
    /**
     *
     */

    if (!items.length) {
      items = sliceTen(newItems)
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
        generateUnique(el.author).forEach((el, idx) => {
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
    score = Settings.getLocalStorage(`score_${category}`) || resetScore()
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
    let pressedOnce = false
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
          pressedOnce = true
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
