import './app.css';

export class App {
  constructor() {
    this.container = undefined;
  }

  init() {
    console.log('app started');
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
  }
}
