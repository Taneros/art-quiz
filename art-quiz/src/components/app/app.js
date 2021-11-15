import './app.css'
import '../../style.css'
import Model from '../model.js'
import View from '../view.js'
import Router from '../router.js'

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
          <div class="container">
            <a href="#author" data-role="menu-author" class="main-menu__author button btn btn-info">AUTHOR QUIZ</a>
            <a href="#picture" data-role="menu-pictures" class="main-menu__pictures button btn btn-info">PICTURES QUIZ</a>
          </div>
        </div>
        <div id="results"></div>
        <div class="author-quiz">
      </div>
      <footer></footer>
    </div>
    `
    ;(async () => {
      console.log('results in DOM', !!document.getElementById('results'))
      try {
        await Model.loadJSON()
        Router.init()
      } catch (e) {
        console.error(e)
      }
    })()
  }
}
