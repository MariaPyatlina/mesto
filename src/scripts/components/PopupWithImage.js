import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._pictureInPopup = this._popup.querySelector('.popup__image');  //Картинка в попапе
        this._captionInPopup = this._popup.querySelector('.popup__caption'); //Подпись в попапе
    }

    open(name, link){
        super.open();

        this._pictureInPopup.src = link;
        this._pictureInPopup.alt = name;
        this._captionInPopup.textContent = name;
    }
}