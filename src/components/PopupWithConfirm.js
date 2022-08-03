import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._popupForm = this._popup.querySelector('.popup_form');
    }

    setEventListeners(){
        super.setEventListeners();
        // this._formPopup.addEventListeners('submit', (evt) =>{
        //     evt.preventDefault();
        //     //TODO тут как-то надо удалять карточку
        //     console.log('тут как-то надо удалять карточку');
        // })
    }
}