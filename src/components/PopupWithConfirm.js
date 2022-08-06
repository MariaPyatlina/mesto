import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, api){
        super(popupSelector);
        this._api = api;
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    open(cardId, handleRemove){
        super.open();
        this._cardId = cardId;
        this._handleRemove = handleRemove;

    }

    setEventListeners(){
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) =>{
            evt.preventDefault();
                this._api.removeCard(this._cardId)
                .then(() => {
                    this._handleRemove.removeCard();
                    super.close();
                })
                .catch(err => console.log(`Ошибка удаления карточки ${err}`))
        })
    }
}