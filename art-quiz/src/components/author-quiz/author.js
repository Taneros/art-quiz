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

let { quiz_type, params } = Utils.getRoute()
// console.log('params ->', params.category)
let resultsNode
let prevBtn
let nextBtn
let answerBtns
let items
let allAuthorData
let currentQuestionCardNum = 1
let score = [
  { question: 0, el_id: '', correct: 0 },
  { question: 1, el_id: '', correct: 0 },
  { question: 2, el_id: '', correct: 0 },
  { question: 3, el_id: '', correct: 0 },
  { question: 4, el_id: '', correct: 0 },
  { question: 5, el_id: '', correct: 0 },
  { question: 6, el_id: '', correct: 0 },
  { question: 7, el_id: '', correct: 0 },
  { question: 8, el_id: '', correct: 0 },
  { question: 9, el_id: '', correct: 0 },
]

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
  console.log(random)
  return items[random].author
}

function generateUnique(params) {
  let mySet = new Set().add(params)
  while (mySet.size < 4) {
    mySet.add(getRndItem())
  }
  console.log(mySet)
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
  // store locally
  // Settings.setLocalStorage('authorData', allAuthorData[params])
  return allAuthorData[params]
}

export default {
  // save info from Model for rendering
  setData(newItems, params_cat) {
    // console.log('newItems', newItems)
    resultsNode = document.getElementById('results')
    params_cat = params_cat
    items = Settings.getLocalStorage(`items_${params_cat}`) || []
    allAuthorData = Settings.getLocalStorage(`allAuthorData_${params_cat}`) || []

    // TODO
    /**
     *
     */

    // restoreFromLocal(items, params_cat)

    if (!items.length) {
      items = sliceTen(newItems)
      // write current set to getLocalStorage
      Settings.setLocalStorage(`items_${params_cat}`, items)
    }

    // generate 10 packs of questions for current category
    if (!allAuthorData.length) {
      items.forEach((el, idx) => {
        // console.log('allAuthors el, idx ->', el, idx)
        const singleQuestionData = {}
        // grab an image
        singleQuestionData.img = el.imageNum
        console.log('correct author', el.author)
        // generate 3 extra
        generateUnique(el.author).forEach((el, idx) => {
          singleQuestionData[`answer-${idx + 1}`] = el
        })
        allAuthorData.push(singleQuestionData)
      })
      // store locally
      Settings.setLocalStorage(`allAuthorData_${params_cat}`, allAuthorData)
    }
  },

  /******************* R E N D E R *******************/

  render() {
    // setting current author (-1 to adjust for array idx)
    console.log('render', currentAuthor(currentQuestionCardNum - 1))
    // render page
    resultsNode.innerHTML = View.render('author', currentAuthor(currentQuestionCardNum - 1))

    score = Settings.getLocalStorage(`score_${params.category}`) === false ? score : Settings.getLocalStorage(`score_${params.category}`)

    // TODO
    /**
     *
     * store round__expressionism
     * {1: ['correct', btn#], 2: ['', btn#]}
     *
     * function checkUniqueElArr for frunction (arr)
     *
     * let buffSet = Set()
     *
     * arr.forEach(el) {
     *
     * buffSet.add(el)
     *
     * }
     *
     * let buffArr = Array.from(buffSet)
     *
     * if (buffArr.length = buffArr.legth) return true
     *
     * return false
     *
     *
     * or just premade object to avoid errors
     *
     *
     */

    // console.log('resultsNode', resultsNode)
    // prev and next button iteration
    prevBtn = document.getElementById('prev')
    nextBtn = document.getElementById('next')

    // answer buttons
    answerBtns = document.getElementsByClassName('answers__answer')
    let pressedOnce = false
    Array.from(answerBtns).forEach((el) => {
      el.addEventListener('click', () => {
        let answerResult = { el_id: '', correct: 0 }
        // console.log(el.innerHTML)
        if (el.innerHTML === items.filter((el) => el.imageNum === currentAuthor(currentQuestionCardNum - 1).img)[0].author) {
          // console.log('correct!')
          el.classList.add('correct')
          // answerResult = 'correct'
          // answerResult.question = currentQuestionCardNum - 1
          // answerResult.el_id = el.id
          // score[currentQuestionCardNum - 1].el_id = el.id
          answerResult.el_id = el.id
          answerResult.correct = 1
        } else {
          el.classList.add('notcorrect')
          // answerResult = 'not correct'
          // answerResult.question = currentQuestionCardNum - 1
          // answerResult.el_id = el.id
          // score[currentQuestionCardNum - 1].el_id = el.id
          answerResult.el_id = el.id
          answerResult.correct = 0
        }
        // score.filter((el) => el.question === currentQuestionCardNum - 1).length
        if (!score[currentQuestionCardNum - 1].el_id) {
          pressedOnce = true
          // score.push(answerResult)
          score[currentQuestionCardNum - 1].el_id = answerResult.el_id
          score[currentQuestionCardNum - 1].correct = answerResult.correct
          Settings.setLocalStorage(`score_${params.category}`, score)
        }
      })
    })
    //
    // console.log(answerBtns)

    // event listener for prev
    prevBtn.addEventListener('click', () => {
      if (currentQuestionCardNum < 11 && currentQuestionCardNum > 1) {
        currentQuestionCardNum--
        // console.log(currentQuestionCardNum)
        // take next question from the pack
        // this.setData(items, params.category)
        this.render()
      }
    })
    nextBtn.addEventListener('click', () => {
      if (currentQuestionCardNum < 10 && currentQuestionCardNum >= 1) {
        currentQuestionCardNum++
        // console.log(currentQuestionCardNum)
        // this.setData(items, params.category)
        this.render()
      }
    })
  },
}
