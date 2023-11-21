export class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = selector;
    hidden && this.hide();
  }

  enabled() {
    this.refs.disabled = false;
    this.refs.textContent = 'Load more';
  }

  disabled() {
    this.refs.disabled = true;
    this.refs.textContent = 'Loading...';
  }

  show() {
    this.refs.classList.remove('is-hidden');
  }
  hide() {
    this.refs.classList.add('is-hidden');
  }
}
