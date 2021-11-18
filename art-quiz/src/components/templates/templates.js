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
  </div>
</div>
  `,
  picture: `
  <div class="picture-quiz">
  <div class="container">
    <h2 class="picture-quiz__text text">Какая картина принадлежит {{author}}?</h2>
    <div class="container">
      <div id="prev" class="btn btn-info"><i class="fa fa-angle-left"></i></div>
      <div class="picture-quiz__picture">
        <div class="picture-quiz__picture__item" id='1' style="background-image: url('./images/img/{{1}}.jpg');"></div>
        <div class="picture-quiz__picture__item" id='2' style="background-image: url('./images/img/{{2}}.jpg');"></div>
        <div class="picture-quiz__picture__item" id='3' style="background-image: url('./images/img/{{3}}.jpg');"></div>
        <div class="picture-quiz__picture__item" id='4' style="background-image: url('./images/img/{{4}}.jpg');"></div>
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
  </div>
</div>
  `,
}
