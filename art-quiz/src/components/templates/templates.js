export default {
  author: `
  <div class="author-quiz">
  <div class="container">
    <h2 class="author-quiz__text text">Кто автор этой картины?</h2>
    <div class="container">
    <div id="prev" class="btn btn-info"><i class="fa fa-angle-left"></i></div>
    <div class="author-quiz__picture" style="background-image: url('./images/img/{{img}}.jpg');"></div>
    <div id="next" class="btn btn-info"><i class="fa fa-angle-right"></i></div>
  </div>

    <div class="pagination">
    <nav aria-label="Page navigation">
      <ul class="pagination pagination-sm">
          </li>
              <li class="page-item"><a  class="page-link" id="pg_1">1</a></li>
              <li class="page-item"><a  class="page-link" id="pg_2">2</a></li>
              <li class="page-item"><a  class="page-link" id="pg_3">3</a></li>
              <li class="page-item"><a  class="page-link" id="pg_4">4</a></li>
              <li class="page-item"><a  class="page-link" id="pg_5">5</a></li>
              <li class="page-item"><a  class="page-link" id="pg_6">6</a></li>
              <li class="page-item"><a  class="page-link" id="pg_7">7</a></li>
              <li class="page-item"><a  class="page-link" id="pg_8">8</a></li>
              <li class="page-item"><a  class="page-link" id="pg_9">9</a></li>
              <li class="page-item"><a  class="page-link" id="pg_10">10</a></li>
            </ul>
          </nav>
    </div>

    <div class="answers">
      <div class="container">
        <ul class="answers wraper list-group">
          <li class="answers__answer list-group-item" id="1">{{answer-1}}</li>
          <li class="answers__answer list-group-item" id="2">{{answer-2}}</li>
          <li class="answers__answer list-group-item" id="3">{{answer-3}}</li>
          <li class="answers__answer list-group-item" id="4">{{answer-4}}</li>
        </ul>
      </div>
    </div>
    <!-- Answer Modal -->
    <div class="modal fade" id="quiz-modal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">{{correctAnswer}} написал эту картину.</h4>
            <button id="quiz-modal-close-btn" type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="modal-body__answer-image" style="background-image: url('./images/img/{{img}}.jpg');"></div>
          </div>
          <div class="modal-footer">
            <button id="quiz-modal-prev-btn" type="button" class="btn btn-info" data-bs-dismiss="modal">Предыдущий</button>
            <button id="quiz-modal-next-btn" type="button" class="btn btn-info" data-bs-dismiss="modal">Следующий</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Round Score Modal -->
    <div class="modal fade" id="quiz-modal-round-score">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title .text-center">Ваши баллы в этом раунде:</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="modal-body__score">
              <span id="win" class = "text-success">5</span><span>/</span><span id="loss" class = "text-danger">5</span>
            </div>
          </div>
          <div class="modal-footer">
            <a id="quiz-modal-round-score-home-btn" type="button" class="btn btn-info" data-bs-dismiss="modal">Домой</a>
            <a id="quiz-modal-round-score-next-btn" type="button" class="btn btn-info" data-bs-dismiss="modal">Следующая категория</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  picture: `
  <div class="picture-quiz">
  <div class="container">
    <h2 class="picture-quiz__text text">Какую картину написал {{author}}?</h2>
    <div class="container">
      <div id="prev" class="btn btn-info"><i class="fa fa-angle-left"></i></div>
      <div class="picture-quiz__picture">
        <div class="picture-quiz__picture__item answers__answer" id='1' style="background-image: url('./images/img/{{answer-1}}.jpg');"></div>
        <div class="picture-quiz__picture__item answers__answer" id='2' style="background-image: url('./images/img/{{answer-2}}.jpg');"></div>
        <div class="picture-quiz__picture__item answers__answer" id='3' style="background-image: url('./images/img/{{answer-3}}.jpg');"></div>
        <div class="picture-quiz__picture__item answers__answer" id='4' style="background-image: url('./images/img/{{answer-4}}.jpg');"></div>
      </div>
      <div id="next" class="btn btn-info"><i class="fa fa-angle-right"></i></div>
    </div>
    <div class="pagination">
      <nav aria-label="Page navigation">
        <ul class="pagination pagination-sm">
          </li>
          <li class="page-item"><a class="page-link" id="pg_1">1</a></li>
          <li class="page-item"><a class="page-link" id="pg_2">2</a></li>
          <li class="page-item"><a class="page-link" id="pg_3">3</a></li>
          <li class="page-item"><a class="page-link" id="pg_4">4</a></li>
          <li class="page-item"><a class="page-link" id="pg_5">5</a></li>
          <li class="page-item"><a class="page-link" id="pg_6">6</a></li>
          <li class="page-item"><a class="page-link" id="pg_7">7</a></li>
          <li class="page-item"><a class="page-link" id="pg_8">8</a></li>
          <li class="page-item"><a class="page-link" id="pg_9">9</a></li>
          <li class="page-item"><a class="page-link" id="pg_10">10</a></li>
        </ul>
      </nav>
    </div>
    <!-- The Modal -->
    <div class="modal fade" id="quiz-modal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">{{author}} написал эту картину.</h4>
            <button id="quiz-modal-close-btn" type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="modal-body__answer-image" style="background-image: url('./images/img/{{correctAnswer}}.jpg');"></div>
          </div>
          <div class="modal-footer">
            <button id="quiz-modal-prev-btn" type="button" class="btn btn-info" data-bs-dismiss="modal">Предыдущий</button>
            <button id="quiz-modal-next-btn" type="button" class="btn btn-info" data-bs-dismiss="modal">Следующий</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Round Score Modal -->
    <div class="modal fade" id="quiz-modal-round-score">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title .text-center">Ваши баллы в этом раунде:</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="modal-body__score">
              <span id="win" class = "text-success">5</span><span>/</span><span id="loss" class = "text-danger">5</span>
            </div>
          </div>
          <div class="modal-footer">
            <a id="quiz-modal-round-score-home-btn" type="button" class="btn btn-info" data-bs-dismiss="modal">Домой</a>
            <a id="quiz-modal-round-score-next-btn" type="button" class="btn btn-info" data-bs-dismiss="modal">Следующая категория</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  </div>
</div>
  `,
  quiz_menu: `
  <div class="container">
  <a href="#author" data-role="menu-author" class="main-menu__author button btn btn-info">По Автору</a>
  <a href="#picture" data-role="menu-pictures" class="main-menu__pictures button btn btn-info">По Произведению</a>
  </div>
  `,
  quiz_cats: `
  <div class="author-quiz-cat container">
  <div class="author-quiz-cat card-group">
    <div class="card" id="avant-garde-m">
      <div class="overlay"><img src="./images/img/{{img1}}.jpg" class="card-img-top" alt=""></div>
      <div class="card-body">
        <h5 class="card-title fs-6">Авангард</h5>
        <p class="card-text"><small class="text-muted"><span class="badge bg-success">1</span> <span class="badge bg-danger">9</span></small></p>
      </div>
    </div>
    <div class="card" id="expressionism-m">
      <div class="overlay"><img src="./images/img/{{img2}}.jpg" class="card-img-top" alt=""></div>
      <div class="card-body">
        <h5 class="card-title fs-6">Экспрессионизм</h5>
        <p class="card-text"><small class="text-muted"><span class="badge bg-success">1</span> <span class="badge bg-danger">9</span></small></p>
      </div>
    </div>
    <div class="card" id="impressionism-m">
      <div class="overlay"><img src="./images/img/{{img3}}.jpg" class="card-img-top" alt=""></div>
      <div class="card-body">
        <h5 class="card-title fs-6">Ипрессионизм</h5>
        <p class="card-text"><small class="text-muted"><span class="badge bg-success">1</span> <span class="badge bg-danger">9</span></small></p>
      </div>
    </div>
    <div class="card" id="landscape-m">
      <div class="overlay"><img src="./images/img/{{img4}}.jpg" class="card-img-top" alt=""></div>
      <div class="card-body">
        <h5 class="card-title fs-6">Пейзаж</h5>
        <p class="card-text"><small class="text-muted"><span class="badge bg-success">1</span> <span class="badge bg-danger">9</span></small></p>
      </div>
    </div>
    <div class="card" id="marine-m">
      <div class="overlay"><img src="./images/img/{{img5}}.jpg" class="card-img-top" alt=""></div>
      <div class="card-body">
        <h5 class="card-title fs-6">Морской пейзаж</h5>
        <p class="card-text"><small class="text-muted"><span class="badge bg-success">1</span> <span class="badge bg-danger">9</span></small></p>
      </div>
    </div>
    <div class="card" id="painting-m">
      <div class="overlay"><img src="./images/img/{{img6}}.jpg" class="card-img-top" alt=""></div>
      <div class="card-body">
        <h5 class="card-title fs-6">Живопись</h5>
        <p class="card-text"><small class="text-muted"><span class="badge bg-success">1</span> <span class="badge bg-danger">9</span></small></p>
      </div>
    </div>
    <div class="card" id="portrait-m">
      <div class="overlay"><img src="./images/img/{{img7}}.jpg" class="card-img-top" alt=""></div>
      <div class="card-body">
        <h5 class="card-title fs-6">Портрет</h5>
        <p class="card-text"><small class="text-muted"><span class="badge bg-success">1</span> <span class="badge bg-danger">9</span></small></p>
      </div>
    </div>
    <div class="card" id="realism-m">
      <div class="overlay"><img src="./images/img/{{img8}}.jpg" class="card-img-top" alt=""></div>
      <div class="card-body">
        <h5 class="card-title fs-6">Реализм</h5>
        <p class="card-text"><small class="text-muted"><span class="badge bg-success">1</span> <span class="badge bg-danger">9</span></small></p>
      </div>
    </div>
    <div class="card" id="religion-m">
      <div class="overlay"><img src="./images/img/{{img9}}.jpg" class="card-img-top" alt=""></div>
      <div class="card-body">
        <h5 class="card-title fs-6">Религия</h5>
        <p class="card-text"><small class="text-muted"><span class="badge bg-success">1</span> <span class="badge bg-danger">9</span></small></p>
      </div>
    </div>
    <div class="card" id="renaissance-m">
      <div class="overlay"><img src="./images/img/{{img10}}.jpg" class="card-img-top" alt=""></div>
      <div class="card-body">
        <h5 class="card-title fs-6">Ренесанс</h5>
        <p class="card-text"><small class="text-muted"><span class="badge bg-success">1</span> <span class="badge bg-danger">9</span></small></p>
      </div>
    </div>
    <div class="card" id="romanticism-m">
      <div class="overlay"><img src="./images/img/{{img11}}.jpg" class="card-img-top" alt=""></div>
      <div class="card-body">
        <h5 class="card-title fs-6">Романтизм</h5>
        <p class="card-text"><small class="text-muted"><span class="badge bg-success">1</span> <span class="badge bg-danger">9</span></small></p>
      </div>
    </div>
    <div class="card" id="surrealism-m">
    <div class="overlay"><img src="./images/img/{{img12}}.jpg" class="card-img-top" alt=""></div>
      <div class="card-body">
        <h5 class="card-title fs-6">Сюрреализм</h5>
        <p class="card-text"><small class="text-muted"><span class="badge bg-success">1</span> <span class="badge bg-danger">9</span></small></p>
      </div>
    </div>
  </div>
</div>
  `,
}
