import templates from '../templates/templates.js'
import View from '../view.js'

let resultsNode
let items
let tempates

export default {
  setData(newItems) {
    resultsNode = document.getElementById('results')
    console.log('author.js', resultsNode)
    // store passed-in data
    items = newItems
  },
  render() {
    resultsNode.innerHTML = View.render('author', templates)
  },
}
