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
    </div>
    <footer class="footer">
      <div class="footer__content">
      <div class="footer__link">
        <a href="https://github.com/taneros" target="_blank">
          <img class="icon-git" src="./images/github.svg" alt="link">
        </a>
      </div>
      <div class="footer__link">
        <p>© 2021</p>
      </div>
      <div class="footer__link">
        <a href="https://rs.school/js/" title="Link to the course" target="_blank">
          <img class="icon-rss" src="./images/rs_school_js_grey.svg" alt="link">
        </a>
      </div>
    </div>
    </footer>
    
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
    //     console.log(`
    //     Самооценка: 190 / 220

    //   Стартовая страница и навигация +20

    //     +10 вёрстка, дизайн, UI стартовой страницы приложения. Выполняются требования к вёрстке и оформлению приложения +10
    //     + На стартовой странице есть кнопка, при клике по которой открываются настройки викторины, и две кнопки, при кликах по которым можно выбрать тип вопроса:
    //     +10 реализована навигация по страницам приложения +10

    //   Настройки +20

    //     +10 в настройках есть возможность включать/выключать звук, есть регулятор громкости звука. Если звук включён, есть звуковая индикация разная для правильных и неправильных ответов, звуковое сопровождение окончания раунда +10
    //     - в настройках есть возможность включать/выключать игру на время. Если выбрана игра на время, на странице с вопросами викторины отображается таймер, отсчитывающий время, которое отведено для ответа на вопрос +10
    //     - в настройках можно указать время для ответа на вопрос в интервале от 5 до 30 секунд с шагом в 5 секунд. Если время истекает, а ответа нет, это засчитывается как неправильный ответ на вопрос +10
    //     +10 при перезагрузке страницы приложения выбранные настройки сохраняются +10

    //   Страница категорий +30

    //     +10 вёрстка, дизайн, UI страницы категории. Выполняются требования к вёрстке и оформлению приложения +10
    //     +10 карточка сыгранной категории внешне отличается от карточки категории, которая ещё не игралась +10
    //     +10 на карточке сыгранной категории отображается результат прохождения раунда - количество вопросов, на которые был дан правильный ответ +10

    //   Страница с вопросами +50

    //     +10 вёрстка, дизайн, UI страницы с вопросами. Выполняются требования к вёрстке и оформлению приложения +10
    //     +10 варианты ответов на вопросы генерируются случайным образом +10
    //     +10 правильным и неправильным ответам пользователя соответствуют индикаторы разного цвета +10
    //     +10 после того, как ответ выбран, появляется модальное окно с правильным ответом на вопрос и кнопкой "Продолжить". При клике по кнопке "Продолжить" пользователь переходит к следующему вопросу категории +10
    //     +10 после окончания раунда выводится уведомление об окончании раунда и его результат - количество вопросов, на которые был дан правильный ответ. Есть кнопка "Продолжить" при клике по которой пользователь перенаправляется на страницу категорий данного типа вопросов +10

    //   Страница с результатами +40

    //     +10 вёрстка, дизайн, UI страницы с результатами. Выполняются требования к вёрстке и оформлению приложения +10
    //     +10 страница с результатами содержит превью всех картин категории +10
    //     +10 картины, на вопросы про которые или про их авторов был дан правильный ответ, цветные; картины, на вопросы про которые или про их авторов был дан неправильный ответ, черно-белые +10
    //     - >>NEXTt>> при клике по картине выводится информация о ней - название, автор, год создания +10
    //     - >>NEXT>если раунд переигрывался, и результаты изменились, эти изменения отображаются на странице с результатами +10

    //     - Плавная смена изображений; картинки сначала загружаются, потом отображаются; нет ситуации, когда пользователь видит частично загрузившиеся изображения. Плавную смену изображений не проверяем: 1) при загрузке и перезагрузке приложения 2) при открытой консоли браузера +10

    //   +10 Реализована анимация отдельных деталей интерфейса, также анимированы переходы и взаимодействия

    //     +5 анимация окна настроек
    //     +5 анимация слайдера главного меню

    // Дополнительный функционал на выбор +20

    //   +10 доп настройка сбросить игру
    //   + 10 слайдер на главном меню
    //   + удобные клавиши вперед назад на главной панели игры
    //   + выпадающее меню с категориями во время раунда для удобства навигации

    //     `)
  }
}
