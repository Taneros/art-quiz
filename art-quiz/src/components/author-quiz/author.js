import View from '../view.js'
import Settings from '../settings.js'
import Utils from '../utilities.js'
import Model from '../model.js'

//TODO
/**
 *
 * move to utils
 * fn get current question set
 * fn check doubles
 *
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
    // console.log('less than 10 getting more')
    noDublicates.push(Model.getRandom())
    // console.log(noDublicates)
    noDublicates = checkDoublicates(noDublicates)
  }
  return noDublicates
}

export default {
  // save info from Model for rendering
  setData(newItems, params_cat) {
    // console.log('newItems, params_cat:', newItems, params_cat)
    newItems = checkDoublicates(newItems)
    // console.log('newItems, params_cat:', newItems, params_cat)
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
    // console.log('render getCurrentQuestionSet:', getCurrentQuestionSet(currentQuestionCardNum - 1))
    // render page
    resultsNode.innerHTML = View.render('author', getCurrentQuestionSet(currentQuestionCardNum - 1))
    // console.log(`score_auth_${category}`)

    // TODO
    /**
     *
     * track score if wins + loss = 10 > show round score
     *
     */

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
      // this.render()
      score.forEach((score) => {
        const correct = score.correct
        if (correct) {
          roundScore.wins += 1
        } else if (correct === 0) roundScore.losses += 1
      })
      console.log('roundScore', roundScore)
      if (roundScore.wins + roundScore.losses === 10) {
        roundScoreWin.innerHTML = `${roundScore.wins}`
        roundScoreLoss.innerHTML = `${roundScore.losses}`
        activateQuizRoundModal.toggle()
        Utils.eventWithPromise(QuizRoundResult, activateQuizRoundModal).then(() => {
          this.render()
        })
      }
    }

    QuizModalCloseBtn.addEventListener('click', () => {
      Utils.eventWithPromise(QuizModal, activateQuizModal).then(() => {
        console.log('close event')
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
          QuizModalBody.classList.add('correct')
          el.classList.add('correct')
          answerResult.el_id = el.id
          answerResult.correct = 1
          Utils.playAudioCorrect()
        } else {
          QuizModalBody.classList.add('notcorrect')
          el.classList.add('notcorrect')
          answerResult.el_id = el.id
          answerResult.correct = 0
          Utils.playAudioNotcorrect()
        }
        if (!score[currentQuestionCardNum - 1].el_id) {
          score[currentQuestionCardNum - 1].el_id = answerResult.el_id
          score[currentQuestionCardNum - 1].correct = answerResult.correct
          Settings.setLocalStorage(`score_auth_${category}`, score)
        }

        if (currentQuestionCardNum === 10) {
          if (!Utils.modalState.isActiveModal) {
            console.log('noactive modal')
            activateQuizModal.toggle()
            Utils.eventWithPromise(QuizModal, activateQuizModal)
              .then(() => {
                showRoundScore()
              })
              .then(() => {
                Utils.playAudioFinishRound()
              })
          }
          roundScoreHomeBtn.addEventListener('click', () => {
            location.href = location.href.split('#')[0]
            activateQuizModal.toggle()
          })
          roundScoreNextBtn.addEventListener('click', () => {
            location.hash = '#author'
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
            // activateQuizModal.toggle()
            // Utils.eventWithPromise(QuizModal, activateQuizModal).then(() => {
            //   this.render()
            // })
          }
        }
      })
    })

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
