const template = document.createElement('template');

template.innerHTML = `
  <todo-form></todo-form>
  <ul id="list-container"></ul>
`;

const mockTodos = [
  {
    title: 'Read some books',
    done: false,
  },
  {
    title: 'Buy some serials',
    done: true,
  },
];

export default class TodoList extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.todos = mockTodos;
  }

  connectedCallback() {
    this.root.appendChild(template.content.cloneNode(true));
    this.todosEl = this.root.getElementById('list-container');
    this.formEl = this.root.querySelector('todo-form');

    this.formEl.addEventListener('onSubmit', this.addTodo.bind(this));
    this.render();
  }

  addTodo(e) {
    this.todos.push({
      title: e.detail.value,
      done: false,
    });
    this.render();
  }

  removeTodo(e) {
    const ix = this.todos.findIndex(todo => todo.title === e.detail.title);
    if (ix === -1) {
      throw new Error('Error trying to remove certain todo item');
    }
    this.todos.splice(ix, 1);
    this.render();
  }

  toggleTodo(e) {
    const todo = this.todos.find(({ title }) => title === e.detail.title);
    todo.done = e.detail.checked;
    this.render();
  }

  render() {
    const todosHtml = document.createDocumentFragment();
    this.todosEl.innerHTML = '';
    this.todos.forEach(({ title, done }) => {
      const itemHtml = document.createElement('todo-list-item');
      itemHtml.setAttribute('title', title);
      itemHtml.setAttribute('done', done);

      itemHtml.addEventListener('onToggle', this.toggleTodo.bind(this));
      itemHtml.addEventListener('onRemove', this.removeTodo.bind(this));

      todosHtml.appendChild(itemHtml);
    });
    this.todosEl.append(todosHtml);
  }
}
