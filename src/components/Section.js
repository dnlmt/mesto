class Section {
    constructor({ items, renderer }, selector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    render() {
        this._items.reverse().forEach((this._renderer));
    }

    addItem(elem) {
        this._container.prepend(elem);
    }
}

export default Section;