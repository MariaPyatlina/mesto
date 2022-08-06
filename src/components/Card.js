export default class Card{
    constructor({data, cardSelector, userId, 
                 handleCardClick, handleCardDelete, 
                 handleLikeCard, handleDisLikeCard}){
        
        this._cardId = data._id;  // id карточки, который пришел с сервера
        this._name = data.name; //название
        this._link = data.link; //ссылка-картинка
        this._likes = data.likes; //массив с лайкнувшими пользователями. Нас интересует количество

        this._cardOwner = data.owner._id; //id владельца карточки

        this._userId = userId; //id себя
        
        this._cardSelector = cardSelector;

        this._handleCardClick = handleCardClick; //Открывает попап с картинкой при клике на карточку
        this._handleCardDelete = handleCardDelete; //Открывает попап подтверждения удаления
        this._handleLikeCard = handleLikeCard;
        this._handleDisLikeCard = handleDisLikeCard;
    }
    
    _getTemplate(){ //Забирает разметку из html и клонирует содержимое шаблона карточки
        this._element = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);

        return this._element;
    }

    
    _setEventListeners(){  //Навешивает слушателей на события
        
        this._cardImage.addEventListener('click', ()=>{ //на клик по картинке
            this._handleCardClick(this._name, this._link);
        });

        
        this._deleteButton.addEventListener('click', ()=>{ //на клик по мусорке
            this._handleCardDelete(this._cardId);
        });

        
        this._likeButton.addEventListener('click', () => {//на клик по кнопке Лайк   
            if (this._likeButton.classList.contains('card__like-button_active')) {
                this._handleDisLikeCard(this._cardId);
                this._toggleLikeCard();
            } else {
                this._handleLikeCard(this._cardId);
                this._toggleLikeCard();
            }
        });
    };

   
    removeCard(){ //Удаляет карточку
        this._element.remove();
        this._element = null;
    };

    _toggleLikeCard(){ //Переключает фон сердечка
        this._likeButton.classList.toggle("card__like-button_active");
    };

    handleLikeCount(data){  //Отображает количество лайков
        this._likes = data.likes;
        this._likeCount.textContent = this._likes.length;
    }

    _availableRemoveButton() { //Определяем нужно ли рисовать Мусорку
            if (this._cardOwner !== this._userId) {
            this._deleteButton.remove();
        }
    }  
    
    _hasMyLike(){  //Определяем,надо ли красить сердечко
        if (this._likes.some((user) => {
            return user._id === this._userId;
        })) {
            this._likeButton.classList.add("card__like-button_active"); 
        }   
    }
    

    generateCard(){
        // Нашли поля в карточке
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.card__image');
        this._cardTitle = this._element.querySelector('.card__title');
        this._likeButton = this._element.querySelector('.card__like-button');
        this._likeCount = this._element.querySelector('.card__like-count');
        this._deleteButton = this._element.querySelector('.card__delete-button');

        // Добавим в них данные
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;
        this._likeCount.textContent = this._likes.length; //кол-во лайков
        this._hasMyLike(); 
        this._availableRemoveButton(); 

        this._setEventListeners();

        return this._element; //готовая карточка!
    }
}