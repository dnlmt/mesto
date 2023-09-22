class Section {
    constructor({ renderer }, selector) {
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    render(cards) {
            cards.reverse().forEach(card => this.addItem(card));
        }

        addItem(elem) {
            this._container.prepend(this._renderer(elem));
        }
}

export default Section;