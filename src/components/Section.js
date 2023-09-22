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

    // render(cards) {
    //     cards.reverse().forEach((this._renderer));
    // }
    //
    // addItem(elem) {
    //     this._container.prepend(elem);
    // }
}

export default Section;