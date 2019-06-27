const template = document.createElement('template');
template.innerHTML = `
  <form>
    <input name="title" type="text" placeholder="Type something you need to do..." />
  </form>
`;

export default class TodoForm extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.root.appendChild(template.content.cloneNode(true));

    this.formEl = this.root.querySelector('form');
    this.inputEl = this.root.querySelector('input');

    this.formEl.addEventListener('submit', this.handleSubmit.bind(this));
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.inputEl.value) return;
    this.dispatchEvent(new CustomEvent('onSubmit', { detail: { value: this.inputEl.value } }));
    this.inputEl.value = '';
  }
}
