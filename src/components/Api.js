export default class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl; //строка
      this._headers = options.headers; //Здесь можеть быть объект с несколькими заголовками
    }

//TODO Обработать ответы в запросах.

    _parseAnswer(res){
        if (res.ok) {
          console.log ('карточки загружены успешно');
          return res.json();
        } 
        else Promise.reject(`ОШибка ${res.status}`);
    }

        //Забирает массив карточке с сервера
    getInitialCards() {
          return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
          }) //В ответ придет массив карточек
          .then(res => this._parseAnswer(res))
        }

    //Забирает данные пользователя с сервера
    getUserData(){
        return fetch(`${this._baseUrl}/users/me`, {
          method: 'GET',
          headers: this._headers
        }) //В ответ придет объект пользователя
        .then(res => this._parseAnswer(res))
    }

    //Отправляет новые данные профиля
    setUserData(){
      return fetch(`${this._baseUrl}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({ //TODO заменить поля которые отправляем
            name: "Marie Skłodowska Curie",
            about: "Physicist and Chemist",
        })
       }) //В ответ придет объект с обновленными данными пользователя
       .then(res => this._parseAnswer(res))
    }
  

    //Отправляет новую карточку на сервер
    sendNewCard({ data }){
      return fetch(`${this._baseUrl}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({ //поля в карточке, которые отправляем
            name: data.name,
            link: data.link,
        })
       }) //В ответ придет объект с новой карточкой
       .then(res => this._parseAnswer(res))
    }

    //Удаляет карточку
    removeCard(){
      return fetch(`${this._baseUrl}/cards/${_id}`, {
          method: 'DELETE',
          headers: this._headers
       }) //В ответ придет ХЗ что. Вероятно 200 ОК
       .then(res => this._parseAnswer(res))
    }

    //Лайкает карточку
    likeCard(){
      return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
        method: 'PUT',
        headers: this._headers
     }) //В ответ придет обновленный json с карточкой. Массив лайков будет обновлен
     .then(res => this._parseAnswer(res))
    }
    
    //ДизЛайкает карточку
    disLikeCard(){
      return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
        method: 'DELETE',
        headers: this._headers
     }) //В ответ придет ХЗ что. Вероятно 200 ОК
     .then(res => this._parseAnswer(res))
    }

    //Обновление аватара
    updateAvatar(data){
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({ //отправляесм ссылку на аватарку
          avatar: data.avatar
        })
      }) //В ответ придет ХЗ что. Вероятно 200 ОК или инфа о  пользователе
      .then(res => this._parseAnswer(res))
    }
  }