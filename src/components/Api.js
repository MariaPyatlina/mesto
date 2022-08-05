//import { data } from "autoprefixer";

export default class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl; //строка
      this._headers = options.headers; //Здесь можеть быть объект с несколькими заголовками
    }

//TODO Обработать ответы в запросах.
    _parseAnswer(res){
        if (res.ok) {
          return res.json();
        } 
        else Promise.reject(`Ошибка ${res.status}`);
    }

//------------ПРО КАРТОЧКИ--------------------------------
    //Забирает массив карточек с сервера
    getInitialCards() {
          return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
          }) //В ответ придет массив карточек
          .then(res => this._parseAnswer(res))
        }

    //Отправляет новую карточку на сервер
    sendNewCard(data){
      return fetch(`${this._baseUrl}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({ //поля в карточке, которые отправляем
            name: data.place_name,
            link: data.place_link
        //     name: 'ДаБудетСнегЗимой',
        //     link: 'https://mirpozitiva.ru/wp-content/uploads/2019/11/1480494344_kot_sneg.jpg'
        })
       }) //В ответ придет объект с новой карточкой
       .then(res => this._parseAnswer(res))
    }

    //Удаляет карточку
    removeCard(cardId){
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
          method: 'DELETE',
          headers: this._headers
       }) //В ответ придет ХЗ что. Вероятно 200 ОК
       .then(res => this._parseAnswer(res))
    }

    //Лайкает карточку
    likeCard(cardId){
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
     }) //В ответ придет обновленный json с карточкой. Массив лайков будет обновлен
     .then(res => this._parseAnswer(res))
    }
    
    //ДизЛайкает карточку
    disLikeCard(cardId){
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
     }) //В ответ придет ХЗ что. Вероятно 200 ОК
     .then(res => this._parseAnswer(res))
    }




//------------ПРО ПРОФИЛЬ--------------------------------
    //Забирает данные пользователя с сервера
        getUserData(){
          return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
          }) //В ответ придет объект пользователя
          .then(res => this._parseAnswer(res))
      }
  
    //Отправляет новые данные профиля
      setUserData(data){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
              name: data.name,
              about: data.profession
          })
         }) //В ответ придет объект с обновленными данными пользователя
         .then(res => this._parseAnswer(res))
      }

    //Обновление аватара
    updateAvatar(data){
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar
        })
      }) //В ответ придет объект с обновленными данными пользователя
      .then(res => this._parseAnswer(res))
    }
  }