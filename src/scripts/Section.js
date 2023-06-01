export default class Section {

  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;

    this._containerSelector = containerSelector;
  }

  setRendererItems(items) {
    this._items = items;
  }

  rendererAllItems() {
    this._items.forEach(item => {
      this.addItem(
      this._renderer({
        name: item.name,
        link: item.link,
        likes: item.likes,
        owner: item.owner,
        _id: item._id,
      }),
      false)
    });
  }

  addItem(item, isAddFirst = true) {
    if (isAddFirst) {
      this._containerSelector.prepend(item);
    } else {
      this._containerSelector.append(item);
    }
  }

}
