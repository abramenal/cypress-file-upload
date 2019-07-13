const template = document.createElement('template');

template.innerHTML = `
  <label for="file-input">Upload a file from below</label>
  <input name="file-input" id="file-input" type="file" />
  <ul></ul>
`;

export default class TodoListItem extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.root.appendChild(template.content.cloneNode(true));
    this.listEl = this.root.querySelector('ul');
    this.inputEl = this.root.querySelector('input[type="file"]');
    this.inputEl.addEventListener('change', this.handleChange.bind(this));
  }

  handleChange(e) {
    e.preventDefault();
    const listFragment = document.createDocumentFragment();

    [].forEach.call(e.target.files, ({ name }) => {
      const listEl = document.createElement('li');
      listEl.innerText = name;
      listFragment.appendChild(listEl);
    });

    this.listEl.append(listFragment);
  }
}
