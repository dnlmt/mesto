import Popup from './Popup.js';

class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupImageName = this._popup.querySelector('.popup__image-name');
    }

    open(image) {
        super.open()
        this._popupImage.src = image.link
        this._popupImage.alt = image.name
        this._popupImageName.textContent = image.name
    }
}

export default PopupWithImage;