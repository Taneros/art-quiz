import '../../nullstyle.css'
import '../../style.css'
import './app.css'
import Model from '../model.js'

export class App {
  constructor() {
    this.container = undefined
    this.header = undefined
  }

  init() {
    console.log('app started')
    // this.container = document.createElement('div')
    // this.container.classList.add('application')
    // document.body.appendChild(this.container)
    // this.header = document.createElement('h1')
    // this.header.classList.add('visually-hidden')
    // this.header.textContent = 'Art Quiz'
    // document.getElementsByClassName('application')[0].appendChild(this.header)
    document.body.innerHTML = `
    <div class="application">
      <div class="container">
        <h1 class="visually-hidden">Art Quiz</h1>
        <div class="main-menu">
          <div class="main-menu container">
            <a href="#artist" class="main-menu__artist button btn btn-info">ARTIST QUIZ</a>
            <a href="#picture" class="main-menu__pictures button btn btn-info">PICTURES QUIZ</a>
          </div>
        </div>
      </div>
      <footer></footer>
    </div>
    `
    ;(async () => {
      try {
        await Model.loadJSON()
        console.log(Model.getAuthor())
        console.log(Model.getImg())
      } catch (e) {
        console.error(e)
      }
    })()
  }
}
