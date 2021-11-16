// import templates from '../templates/templates.js'
import View from '../view.js'
import Settings from '../settings.js'
// import Utils from '../utilities.js'

//TODO
/**
 * move to utilities reused functions between quiz types:
 *
 * shiffleArr()
 * getRndItem()
 * generateUnique()
 *
 *
 */

let resultsNode
let prevBtn
let nextBtn
let items = Settings.getLocalStorage('items') || []
let generatedAnswers
let authorData = Settings.getLocalStorage('authorData') || {}
console.log('authorData from storage->>>', authorData)
let currentQuestionCardNum = 1

// window.addEventListener('load', getLocalStorage)
// window.addEventListener('beforeunload', setLocalStorage)

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
  return params.slice(0, 11)
}

function currentAuthor(params) {
  //TODO
  /**
   *
   * write logic for checking answers and calling render
   *
   * addEventListener on author buttons
   * check answers with the array of
   *
   */
  // store passed-in data
  // grab an image
  authorData.img = items[params].imageNum
  console.log('correct author', items[params].author)
  // push to answers arr and generate 3 extra
  // authorData.answers.push(...generateUnique(items[0].author))
  generateUnique(items[params].author).forEach((el, idx) => {
    authorData[`answer-${idx + 1}`] = el
  })
  // store locally
  Settings.setLocalStorage('authorData', authorData)

  // if (!Object.keys(authorData).length) {
  //   console.log('if', !Object.keys(authorData).length)
  //   // console.log('author.js', resultsNode)
  //   // store passed-in data
  //   // grab an image
  //   authorData.img = items[params].imageNum
  //   console.log('correct author', items[0].author)
  //   // push to answers arr and generate 3 extra
  //   // authorData.answers.push(...generateUnique(items[0].author))
  //   generateUnique(items[params].author).forEach((el, idx) => {
  //     authorData[`answer-${idx + 1}`] = el
  //   })
  //   // store locally
  //   Settings.setLocalStorage('authorData', authorData)
  // } else {
  //   console.log('else', Settings.getLocalStorage('authorData'))
  //   console.log('correct author', items[params].author)
  //   authorData = Settings.getLocalStorage('authorData')
  // }
}

export default {
  // save info from Model for rendering
  setData(newItems) {
    // console.log('newItems', newItems)
    resultsNode = document.getElementById('results')

    // TODO
    /**
     *
     * check if set is already in storage - don't slice and don't save
     *
     */

    if (!items.length) {
      items = sliceTen(newItems)
      // write current set to getLocalStorage
      Settings.setLocalStorage('items', items)
    }

    // setting current author (-1 to adjust for array idx)
    currentAuthor(currentQuestionCardNum - 1)
  },

  render() {
    console.log('render', authorData)
    resultsNode.innerHTML = View.render('author', authorData)

    // prev and next button interation

    prevBtn = document.getElementById('prev')
    nextBtn = document.getElementById('next')

    // console.log(prevBtn)
    // event listener for prev
    prevBtn.addEventListener('click', () => {
      if (currentQuestionCardNum < 11 && currentQuestionCardNum > 1) {
        currentQuestionCardNum--
        console.log(currentQuestionCardNum)
        // take next question from the pack
        this.setData(items)
        this.render()
      }
    })
    nextBtn.addEventListener('click', () => {
      if (currentQuestionCardNum < 10 && currentQuestionCardNum >= 1) {
        currentQuestionCardNum++
        console.log(currentQuestionCardNum)
        this.setData(items)
        this.render()
      }
    })
  },
}
