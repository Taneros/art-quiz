// import templates from '../templates/templates.js'
import View from '../view.js'
import Settings from '../settings.js'

let resultsNode
let items
let generatedAnswers
let authorData = {}

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
    if (Settings.getLocalStorage(authorData)) {
      console.log(!Settings.getLocalStorage(authorData))
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
      // store locally
      Settings.setLocalStorage('authorData', authorData)

      //TODO
      /**
       *
       * write logic for checking answers and calling render
       *
       * addEventListener
       * check answers with the array of
       *
       */
    } else {
      console.log('else', Settings.getLocalStorage('authorData'))
      authorData = Settings.getLocalStorage('authorData')
    }
  },

  render() {
    console.log('render', authorData)
    resultsNode.innerHTML = View.render('author', authorData)
  },
}
