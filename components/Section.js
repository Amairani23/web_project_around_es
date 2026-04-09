export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this.items = items;
    this.renderer = renderer;
    this.container = document.querySelector(containerSelector);
  }

  renderItems() {
    this.items.forEach((item) => {
      const element = this.renderer(item);
      this.addItem(element);
    });
  }

  addItem(element) {
    this.container.prepend(element);
  }
}
