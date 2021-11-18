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
      <div class="main-nav">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="">Home</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Categories</a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" id="avant-garde">Авангард</a></li>
                <li><a class="dropdown-item" id="expressionism">Экспрессионизм</a></li>
                <li><a class="dropdown-item" id="impressionism">Ипрессионизм</a></li>
                <li><a class="dropdown-item" id="landscape">Пейзаж</a></li>
                <li><a class="dropdown-item" id="marine">Морской пейзаж</a></li>
                <li><a class="dropdown-item" id="painting">Живопись</a></li>
                <li><a class="dropdown-item" id="portrait">Портрет</a></li>
                <li><a class="dropdown-item" id="realism">Реализм</a></li>
                <li><a class="dropdown-item" id="religion">Религия</a></li>
                <li><a class="dropdown-item" id="renaissance">Ренесанс</a></li>
                <li><a class="dropdown-item" id="romanticism">Романтизм</a></li>
                <li><a class="dropdown-item" id="surrealism">Сюрреализм</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Settings</a>
            </li>
          </ul>
        </div>
        <h1 class="visually-hidden">Art Quiz</h1>
        <div class="main-menu">
          <div class="container">
            <a href="#author" data-role="menu-author" class="main-menu__author button btn btn-info">По Автору</a>
            <a href="#picture" data-role="menu-pictures" class="main-menu__pictures button btn btn-info">По Произведению</a>
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
