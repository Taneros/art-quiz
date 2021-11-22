import './app.css'
import '../../style.css'
import Model from '../model.js'
import View from '../view.js'
import Router from '../router.js'
import Settings from '../settings.js'

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
            <a class="nav-link" aria-current="page" href="">В начало</a>
          </li>
          <li class="nav-item dropdown visually-hidden">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Категории</a>
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
          <li class="nav-item" id = "settings-nav-link">
            <a class="nav-link">Настройки</a>
          </li>
        </ul>
        <!-- Settings -->
        <div class="modal fade" id="settings" tabindex="-1" aria-labelledby="settings" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Настройки</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="settings-reset">
                <label class="form-check-label" for="settings-reset">Сбросить игру</label>
              </div>
              <div class="form-check form-switch">
                <div class="setting-audio wrapper">
                  <input class="form-check-input" type="checkbox" id="settings-audio">
                  <label class="form-check-label" for="flexSwitchCheckChecked">Звук</label>
                </div>
                <input type="range" class="form-range" min="0" max="5" step="0.5" id="audio-level">
              </div>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="settings-time" disabled = "disabled">
                <label class="form-check-label" for="settings-time">Играть на время (в разработке)</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
              <button type="button" class="btn btn-primary" id="settings-save">Сохранить</button>
            </div>
          </div>
        </div>
      </div>
      </div>
      <!-- Logo -->
      <div class="game-logo">
        <div class="game-logo container"></div>
      </div>
      <div class="container">
        <h1 class="visually-hidden">Art Quiz</h1>
        <div class="main-menu">
          <div class="container">
            <a href="#author" data-role="menu-author" class="main-menu__author button btn btn-info">По автору</a>
            <a href="#picture" data-role="menu-pictures" class="main-menu__pictures button btn btn-info">По Произведению</a>
          </div>
        </div>
        <!-- Carousel -->
        <div class="carousel-wrapper">
        <!-- Carousel -->
        <div id="carousel" class="carousel slide" data-bs-ride="carousel">

          <!-- Indicators/dots -->
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" class="active"></button>
            <button type="button" data-bs-target="#carousel" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#carousel" data-bs-slide-to="2"></button>
          </div>

          <!-- The slideshow/carousel -->
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="./images/img/12.jpg" alt="Los Angeles" class="d-block" style="width:100%">
            </div>
            <div class="carousel-item">
              <img src="./images/img/50.jpg" alt="Chicago" class="d-block" style="width:100%">
            </div>
            <div class="carousel-item">
              <img src="./images/img/125.jpg" alt="New York" class="d-block" style="width:100%">
            </div>
          </div>

          <!-- Left and right controls/icons -->
          <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
          </button>
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
    Settings.settings()
  }
}
