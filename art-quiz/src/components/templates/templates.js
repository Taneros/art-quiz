export default {
  author: `
  <div class="author-quiz">
  <div class="container">
    <h2 class="author-quiz__text text">Кто автор этой картины?</h2>
    <div class="author-quiz__picture" style="background-image: url('./images/img/{{img}}.jpg');"></div>
    <div class="pagination"></div>
    <div class="answers">
      <div class="container">
        <ul class="answers wraper list-group">
          <li class="answers__answer list-group-item active" id="1">{{answer-1}}</li>
          <li class="answers__answer list-group-item" id="2">{{answer-2}}</li>
          <li class="answers__answer list-group-item" id="3">{{answer-3}}</li>
          <li class="answers__answer list-group-item" id="4">{{answer-4}}</li>
        </ul>
      </div>
    </div>
  </div>
</div>
  `,
  picture: '',
}
