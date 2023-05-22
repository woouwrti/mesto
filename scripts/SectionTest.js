export class Section {

  constructor({ items, renderer }, containerSelector) {
    this._items = items,
      this._renderer = renderer,

      this._containerSelector = containerSelector
  }

  addItem() {
    this._containerSelector.prepend(item);
  }
}
