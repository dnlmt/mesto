class Section {
    constructor({ items, renderer }, container) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(container);
    }

    render() {
        this._items.reverse().forEach((item) => {
            this._renderer(item);
        });
    }

    addItem(elem) {
        this._container.prepend(elem);
    }
}

export default Section;