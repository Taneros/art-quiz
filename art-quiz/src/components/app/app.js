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
    // TODO
    /**
     * add header element place there nav links
     *
     * body container
     * header
     * main
     *  - application
     * footer
     */

    document.body.innerHTML = `
    <div class="application">
      <div class="main-nav">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="">Home</a>
          </li>
          <li class="nav-item dropdown visually-hidden">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Categories</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item active" id="avant-garde">Авангард<span class="badge rounded-pill bg-danger">4</span><span class="badge rounded-pill bg-success">4</span></a></li>
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
      <div class="container">
        <h1 class="visually-hidden">Art Quiz</h1>
        <div class="main-menu">
          <div class="container">
            <a href="#author" data-role="menu-author" class="main-menu__author button btn btn-info">AUTHOR QUIZ</a>
            <a href="#picture" data-role="menu-pictures" class="main-menu__pictures button btn btn-info">PICTURES QUIZ</a>
          </div>
        </div>
        <div id="results"></div>
    </div>
    <footer></footer>
    `
    ;(async () => {
      // console.log('results in DOM', !!document.getElementById('results'))
      try {
        await Model.loadJSON()
        Router.init()
      } catch (e) {
        console.error(e)
      }
    })()
  }
}
