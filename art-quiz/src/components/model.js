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

  getAuthor() {
    const authorArr = []
    data.forEach((el, idx) => {
      authorArr.push(el.author)
      // console.log(el.author)
    })
    return authorArr
  },
  getImg() {
    const imgArr = []
    data.forEach((el, idx) => {
      imgArr.push(el.imageNum)
    })
    return imgArr
  },
}
