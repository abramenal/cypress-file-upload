import toBoolean from '../../helpers/toBoolean';

const template = document.createElement('template');

template.innerHTML = `
  <li>
    <input type="checkbox" />
    <label></label>
    <button class="destroy">x</button>
  </li>
`;

export default class TodoListItem extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.root.appendChild(template.content.cloneNode(true));

    this.doneEl = this.root.querySelector('input[type="checkbox"]');
    this.labelEl = this.root.querySelector('label');
    this.buttonEl = this.root.querySelector('button');

    this.doneEl.addEventListener('change', this.handleToggle.bind(this));
    this.buttonEl.addEventListener('click', this.handleRemove.bind(this));

    this.render();
  }

  render() {
    this.doneEl.checked = toBoolean(this.getAttribute('done'));
    this.labelEl.innerText = this.getAttribute('title');
  }

  handleToggle(e) {
    e.preventDefault();
    this.dispatchEvent(
      new CustomEvent('onToggle', {
        detail: { title: this.title, checked: e.target.checked },
      }),
    );
  }

  handleRemove(e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('onRemove', { detail: { title: this.title } }));
  }
}
