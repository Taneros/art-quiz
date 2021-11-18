export default {
  sliceTen(params) {
    return params.slice(0, 10)
  },

  shuffleArr(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  },
  getRndItem() {
    const itemsLength = Object.keys(items).length
    const random = Math.floor(Math.random() * itemsLength)
    // console.log(random)
    return items[random].author
  },
  generateUnique(params) {
    let mySet = new Set().add(params)
    while (mySet.size < 4) {
      mySet.add(this.getRndItem())
    }
    // console.log(mySet)
    return this.shuffleArr(Array.from(mySet))
  },

  resetScore() {
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
  },

  getRoute() {
    const path = location.hash ? location.hash.slice(1) : ''
    const [quiz_type, category] = path.split('/')
    return { quiz_type, params: { category } }
  },
}
