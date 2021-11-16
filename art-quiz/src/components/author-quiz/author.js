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

let { quiz_type, params_cat } = Utils.getRoute()
let resultsNode
let prevBtn
let nextBtn
let items = Settings.getLocalStorage(`items_${params_cat}`) || []
// let authorData = Settings.getLocalStorage('authorData') || {}
let allAuthorData = Settings.getLocalStorage(`allAuthorData_${params_cat}`) || [] // replace authorData with this
let currentQuestionCardNum = 1

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

    // TODO
    /**
     *
     */

    if (!items.length) {
      items = sliceTen(newItems)
      // write current set to getLocalStorage
      Settings.setLocalStorage(`items_${params_cat}`, items)
    }

    // generate 10 packs of questions for current category
    if (!allAuthorData.length) {
      items.forEach((el, idx) => {
        console.log('allAuthors el, idx ->', el, idx)
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

  render() {
    // setting current author (-1 to adjust for array idx)
    console.log('render', currentAuthor(currentQuestionCardNum - 1))
    resultsNode.innerHTML = View.render('author', currentAuthor(currentQuestionCardNum - 1))

    // prev and next button iteration
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
