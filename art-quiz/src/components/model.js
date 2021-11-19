// import data from './app/data.json'
// https://github.com/rolling-scopes-school/taneros-JSFE2021Q3/blob/8e19b735597a1dc22d1cbd3a87f9d6f6d87cc1a3/art-quiz/src/components/app/data.json

let data

export default {
  async loadJSON() {
    const res = await fetch('./components/app/data.json')
    data = await res.json()
    // console.log('data', data)
    return data
  },

  getAuthor(cat) {
    // TODO
    /**
     * pass category
     * form array of authors from this category
     *
     */
    // console.log('getAuthor(cat)', data)

    //get one category of authors
    const authorArr = []
    data.forEach((el, idx) => {
      if (el.category === cat) authorArr.push(el)
      // console.log(el.author)
    })
    return authorArr
  },
  getImg(cat) {
    const imgArr = []
    // data.forEach((el, idx) => {
    //   imgArr.push(el.imageNum)
    // })
    data.forEach((el, idx) => {
      if (el.category === cat) imgArr.push(el)
      // console.log(el.author)
    })

    return imgArr
  },
}
