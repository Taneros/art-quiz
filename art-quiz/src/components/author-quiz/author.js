// import templates from '../templates/templates.js'
import View from '../view.js'

let resultsNode
let items
let generatedAnswers
let authorData = {}

function setLocalStorage() {
  localStorage.setItem('authorData', JSON.stringify(authorData))
}

function getLocalStorage() {
  if (localStorage.getItem('authorData')) {
    authorData = JSON.parse(localStorage.getItem('authorData'))
    return true
  }
  return false
}

// window.addEventListener('load', getLocalStorage)
// window.addEventListener('beforeunload', setLocalStorage)

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function getItem() {
  const itemsLength = Object.keys(items).length
  const random = Math.floor(Math.random() * itemsLength)
  return items[random].author
}

function generateThreeUnique(params) {
  let mySet = new Set().add(params)
  while (mySet.size < 4) {
    mySet.add(getItem())
  }
  // console.log(mySet)
  return shuffle(Array.from(mySet))
}

export default {
  // save info from Model for rendering
  setData(newItems) {
    resultsNode = document.getElementById('results')

    // TODO
    /**
     *
     * add logic for reload
     * if (loacal.storage())
     *
     *
     */
    if (!getLocalStorage()) {
      // console.log('author.js', resultsNode)
      // store passed-in data
      items = newItems
      // grab an image
      authorData.img = newItems[0].imageNum
      // console.log('correct author', newItems[0].author)
      // push to answers arr and generate 3 extra
      // authorData.answers.push(...generateThreeUnique(newItems[0].author))
      generateThreeUnique(newItems[0].author).forEach((el, idx) => {
        authorData[`answer-${idx + 1}`] = el
      })
      setLocalStorage()
      // console.log('author.js', authorData)
      // store locally
    }
  },

  render() {
    resultsNode.innerHTML = View.render('author', authorData)
  },
}
