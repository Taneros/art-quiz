import View from '../view.js'
import Settings from '../settings.js'
import Utils from '../utilities.js'

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
let answers

function getCurrentQuestionSet(params) {
  return questionPack[params]
}

export default {
  // save info from Model for rendering
  setData(newItems, params_cat) {
    // console.log('newItems, params_cat:', newItems, params_cat)
    resultsNode = document.getElementById('results')
    category = params_cat
    items = Settings.getLocalStorage(`items_pic_${category}`) || []
    questionPack = Settings.getLocalStorage(`questionPack_pic_${category}`) || []
    score = Settings.getLocalStorage(`score_pic_${category}`) || Utils.resetScore()
    currentQuestionCardNum = 1
    answers = {}

    if (!items.length) {
      items = Utils.sliceTen(newItems)
      // write current set to getLocalStorage
      Settings.setLocalStorage(`items_pic_${category}`, items)
    }

    if (!questionPack.length) {
      items.forEach((el, idx) => {
        // console.log('allAuthors el, idx ->', el, idx)
        const singleQuestionData = {}
        // grab an image
        singleQuestionData.author = el.author
        // console.log('correct image', el.imageNum)
        answers[`${el.author}`] = el.imageNum
        // generate 3 extra
        Utils.generateUnique(el.imageNum, items, 'picture-quiz').forEach((el, idx) => {
          singleQuestionData[`answer-${idx + 1}`] = el
        })
        questionPack.push(singleQuestionData)
      })
      // store locally
      Settings.setLocalStorage(`questionPack_pic_${category}`, questionPack)
    }
  },

  /******************* R E N D E R *******************/

  async render() {
    // setting current author (-1 to adjust for array idx)
    console.log('render getCurrentQuestionSet:', getCurrentQuestionSet(currentQuestionCardNum - 1))
    // console.log('answers:', answers)
    // render page
    resultsNode.innerHTML = View.render('picture', getCurrentQuestionSet(currentQuestionCardNum - 1))

    console.log(`score_pic_${category}`)
    score = Settings.getLocalStorage(`score_pic_${category}`) || Utils.resetScore()
    // console.log('render-score:', score)

    score.forEach((el, idx) => {
      // console.log('el.correct', el.correct)
      if (el.correct === 1) {
        document.getElementById(`pg_${idx + 1}`).classList.add('correct')
      } else if (el.correct !== null) {
        document.getElementById(`pg_${idx + 1}`).classList.add('notcorrect')
      }
      document.getElementById(`pg_${currentQuestionCardNum}`).parentNode.classList.add('scale')
    })

    // prev and next button iteration
    prevBtn = document.getElementById('prev')
    nextBtn = document.getElementById('next')

    // answer buttons
    answerBtns = document.getElementsByClassName('answers__answer')
    // console.log('answer buttons', answerBtns)

    Array.from(answerBtns).forEach((el) => {
      // render btn color
      if (score[currentQuestionCardNum - 1].correct === 1) {
        if (el.id === score[currentQuestionCardNum - 1].el_id) {
          el.classList.add('correct', 'outline')
        }
      } else {
        if (el.id === score[currentQuestionCardNum - 1].el_id) {
          el.classList.add('notcorrect', 'outline')
        }
      }
      // check pressed correct or not
      el.addEventListener('click', () => {
        let answerResult = { el_id: '', correct: 0 }
        // console.log(el.innerHTML)
        // get current image from catDropdown
        const currentCardImg = el.attributes.style.value.match(/\d/g).join('')
        // console.log('currentCardImg', currentCardImg)
        // console.log('getCurrentQuestionSet(currentQuestionCardNum - 1).img)[0]', getCurrentQuestionSet(currentQuestionCardNum - 1))
        // filter questions for current question pack
        const filteredQs = items.filter((el) => el.author === getCurrentQuestionSet(currentQuestionCardNum - 1).author)
        // condition for more than two pictures in questions of the same author in set
        if (filteredQs.length === 1) {
          if (currentCardImg === filteredQs[0].imageNum) {
            el.classList.add('correct', 'outline')
            answerResult.el_id = el.id
            answerResult.correct = 1
          } else {
            el.classList.add('notcorrect', 'outline')
            answerResult.el_id = el.id
            answerResult.correct = 0
          }
        } else {
          console.log('more than two answers!', filteredQs)
          let guessCorrectFromTwo = false
          filteredQs.forEach((fq) => {
            console.log('currentCardImg, fq.imageNum', currentCardImg, fq.imageNum)
            if (currentCardImg === fq.imageNum) {
              el.classList.add('correct', 'outline')
              answerResult.el_id = el.id
              answerResult.correct = 1
              guessCorrectFromTwo = true
            }
          })
          if (!guessCorrectFromTwo) {
            el.classList.add('notcorrect', 'outline')
            answerResult.el_id = el.id
            answerResult.correct = 0
          }
        }
        if (!score[currentQuestionCardNum - 1].el_id) {
          score[currentQuestionCardNum - 1].el_id = answerResult.el_id
          score[currentQuestionCardNum - 1].correct = answerResult.correct
          Settings.setLocalStorage(`score_pic_${category}`, score)
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
