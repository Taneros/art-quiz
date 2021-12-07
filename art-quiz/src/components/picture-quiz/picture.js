import View from '../view.js'
import Settings from '../settings.js'
import Utils from '../utilities.js'

let category
let resultsNode
let mainMenuNode
let prevBtn
let nextBtn
let answerBtns
let items
let questionPack
let currentQuestionCardNum
let score
let answers

export default {
  // save info from Model for rendering
  setData(newItems, params_cat) {
    // console.log('no doubles', checkDoublicates(newItems))
    // console.log('new', checkDoublicates(newItems))
    newItems = Utils.checkDoublicates(newItems)
    // console.log('newItems, params_cat:', newItems, params_cat)
    resultsNode = document.getElementById('results')
    mainMenuNode = document.getElementsByClassName('main-menu')
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
        singleQuestionData.correctAnswer = el.imageNum
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

  render() {
    // setting current author (-1 to adjust for array idx)
    // console.log('render getCurrentQuestionSet:', getCurrentQuestionSet(currentQuestionCardNum - 1))
    // console.log('answers:', answers)
    // render page
    resultsNode.innerHTML = View.render('picture', questionPack[currentQuestionCardNum - 1])

    // Modal for answer scrore
    const QuizModal = document.getElementById('quiz-modal')
    const QuizModalBody = document.querySelector('#quiz-modal div.modal-body')
    const QuizModalCloseBtn = document.getElementById('quiz-modal-close-btn')
    const QuizModalPrevBtn = document.getElementById('quiz-modal-prev-btn')
    const QuizModalNextBtn = document.getElementById('quiz-modal-next-btn')
    const mainPrevBtn = document.getElementById('prev')
    const mainNextBtn = document.getElementById('next')
    const activateQuizModal = new bootstrap.Modal(QuizModal, { backdrop: true })

    // Modal for round results scrore
    const QuizRoundResult = document.getElementById('quiz-modal-round-score')
    const activateQuizRoundModal = new bootstrap.Modal(QuizRoundResult, { backdrop: true })
    const roundScoreWin = document.getElementById('win')
    const roundScoreLoss = document.getElementById('loss')
    const roundScoreHomeBtn = document.getElementById('quiz-modal-round-score-home-btn')
    const roundScoreNextBtn = document.getElementById('quiz-modal-round-score-next-btn')
    const roundScore = { wins: 0, losses: 0, nulls: 10 }

    const showRoundScore = () => {
      score.forEach((score) => {
        const correct = score.correct
        if (correct) {
          roundScore.wins += 1
        } else if (correct === 0) roundScore.losses += 1
      })
      // console.log('roundScore', roundScore)
      if (roundScore.wins + roundScore.losses === 10) {
        roundScoreWin.innerHTML = `${roundScore.wins}`
        roundScoreLoss.innerHTML = `${roundScore.losses}`
        activateQuizRoundModal.toggle()
        Utils.eventWithPromise(QuizRoundResult, activateQuizRoundModal).then(() => {
          Utils.playAudioFinishRound()
          this.render()
        })
      }
    }

    QuizModalCloseBtn.addEventListener('click', () => {
      Utils.eventWithPromise(QuizModal, activateQuizModal).then(() => {
        // console.log('close event')
        this.render()
      })
    })

    QuizModalPrevBtn.addEventListener('click', () => {
      let event = new Event('click')
      prevBtn.dispatchEvent(event)
    })
    // modal prev btn
    if (currentQuestionCardNum === 1) {
      QuizModalPrevBtn.classList.add('disabled')
      mainPrevBtn.classList.add('disabled')
    } else {
      QuizModalPrevBtn.classList.remove('disabled')
      mainPrevBtn.classList.remove('disabled')
    }

    // modal next btn
    QuizModalNextBtn.addEventListener('click', () => {
      let event = new Event('click')
      nextBtn.dispatchEvent(event)
    })
    if (currentQuestionCardNum === 10) {
      QuizModalNextBtn.classList.add('disabled')
      mainNextBtn.classList.add('disabled')
    } else {
      QuizModalNextBtn.classList.remove('disabled')
      mainNextBtn.classList.remove('disabled')
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
        const filteredQs = items.filter((el) => el.author === questionPack[currentQuestionCardNum - 1].author)
        // condition for more than two pictures in questions of the same author in set
        if (filteredQs.length === 1) {
          if (currentCardImg === filteredQs[0].imageNum) {
            QuizModalBody.classList.add('correct')
            el.classList.add('correct', 'outline')
            answerResult.el_id = el.id
            answerResult.correct = 1
            Utils.playAudioCorrect()
          } else {
            QuizModalBody.classList.add('notcorrect')
            el.classList.add('notcorrect', 'outline')
            answerResult.el_id = el.id
            answerResult.correct = 0
            Utils.playAudioNotcorrect()
          }
        } else {
          // console.log('more than two answers!', filteredQs)
          let guessCorrectFromTwo = false
          filteredQs.forEach((fq) => {
            // console.log('currentCardImg, fq.imageNum', currentCardImg, fq.imageNum)
            if (currentCardImg === fq.imageNum) {
              QuizModalBody.classList.add('correct')
              el.classList.add('correct', 'outline')
              answerResult.el_id = el.id
              answerResult.correct = 1
              guessCorrectFromTwo = true
              Utils.playAudioCorrect()
            }
          })
          if (!guessCorrectFromTwo) {
            QuizModalBody.classList.add('notcorrect')
            el.classList.add('notcorrect', 'outline')
            answerResult.el_id = el.id
            answerResult.correct = 0
            Utils.playAudioNotcorrect()
          }
        }
        if (!score[currentQuestionCardNum - 1].el_id) {
          score[currentQuestionCardNum - 1].el_id = answerResult.el_id
          score[currentQuestionCardNum - 1].correct = answerResult.correct
          Settings.setLocalStorage(`score_pic_${category}`, score)
        }
        if (currentQuestionCardNum === 10) {
          if (!Utils.modalState.isActiveModal) {
            // console.log('noactive modal')
            activateQuizModal.toggle()
            Utils.eventWithPromise(QuizModal, activateQuizModal).then(() => {
              showRoundScore()
            })
          }
          roundScoreHomeBtn.addEventListener('click', () => {
            location.href = location.href.split('#')[0]
            activateQuizModal.toggle()
          })
          roundScoreNextBtn.addEventListener('click', () => {
            location.hash = '#picture'
            activateQuizModal.toggle()
          })
        } else {
          if (!Utils.modalState.isActiveModal) {
            activateQuizModal.toggle()
            Utils.eventWithPromise(QuizModal, activateQuizModal).then(() => {
              this.render()
            })
          } else {
            // repeat
            this.render()
          }
        }
      })
    })
    // console.log(answerBtns)

    // event listeners for prev next buttons
    prevBtn.addEventListener('click', () => {
      if (currentQuestionCardNum < 11 && currentQuestionCardNum > 1) {
        currentQuestionCardNum--
        // console.log(currentQuestionCardNum)
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
