export default class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl; //строка
      this._headers = options.headers; //Здесь можеть быть объект с несколькими заголовками
    }

//TODO Обработать ответы в запросах.

    //Забирает данные пользователя с сервера
    getUserData(){
        fetch(`${this._baseUrl}/users/me`, {
          method: 'GET',
          headers: this._headers
        }) //В ответ придет объект пользователя
        .then( res => res.json())
        .then((data) => {
          console.log('чето скачали', data);
        }) //Здесь ждем объект с данными пользователя name, about, avatar, _id
        .catch((err) => {
            console.log(err, 'Ошибка при загрузке данных о пользователе');
        })
    }

    //Отправляет новые данные профиля
    setUserData(){
      fetch(`${this._baseUrl}/users/me`, {
          method: 'PATCH',
          headers: this._headers, //'Content-Type': 'application/json'
          body: JSON.stringify({ //TODO заменить поля которые отправляем
            name: "Marie Skłodowska Curie",
            about: "Physicist and Chemist",
        })
       }) //В ответ придет объект с обновленными данными пользователя
        .then( res => res.json())
        .then((data) => {
          console.log('чето скачали', data);
        }) //Здесь ждем объект с данными пользователя name, about, avatar, _id
        .catch((err) => {
            console.log(err, 'Ошибка при загрузке данных о пользователе');
        })
    }
  
    //Забирает массив карточке с сервера
    getInitialCards() {
      fetch(`${this._baseUrl}/cards`, {
        method: 'GET',
        headers: this._headers
      }) //В ответ придет массив карточек
      .then((res) => {
        console.log(res); //Посмотрим, что возвращает сервер
      })
      .then((data) => {}) //По идее должен быть массив с карточками, а-ля initialCards. Здесь вызываем функцию добавляющую карточки на страницу?
      .catch((err) => {
        console.log(err, 'Ошибка при загрузке карточек с сервера');
      })
    }

    //Отправляет новую карточку на сервер
    sendNewCard(){
      fetch(`${this._baseUrl}/cards`, {
          method: 'POST',
          headers: this._headers, //application/json
          body: JSON.stringify({ //TODO заменить поля которые отправляем
            name: "Marie Skłodowska Curie",
            link: "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
        })
       }) //В ответ придет объект с новой карточкой
        .then( res => res.json())
        .then((data) => {
          console.log('чето скачали', data);
        }) //Здесь ждем объект с данными пользователя name, about, avatar, _id
        .catch((err) => {
            console.log(err, 'Ошибка при загрузке данных о пользователе');
        })
    }

    //Удаляет карточку
    removeCard(){
      fetch(`${this._baseUrl}/cards/${_id}`, {
          method: 'DELETE',
          headers: this._headers
       }) //В ответ придет ХЗ что. Вероятно 200 ОК
        .then( res => res.json())
        .then((data) => {
          console.log('чето скачали', data);
        }) //Здесь ждем объект с данными пользователя name, about, avatar, _id
        .catch((err) => {
            console.log(err, 'Ошибка при загрузке данных о пользователе');
        })
    }

    //Лайкает карточку
    likeCard(){
      fetch(`${this._baseUrl}/cards/${_id}/likes`, {
        method: 'PUT',
        headers: this._headers
     }) //В ответ придет ХЗ что. Вероятно 200 ОК
      .then( res => res.ok)
      .then( () => {
        console.log ('Лайкнуто');
      })
      .catch((err) => {
          console.log(err, 'Ошибка');
      })
    }
    
    //ДизЛайкает карточку
    disLikeCard(){
      fetch(`${this._baseUrl}/cards/${_id}/likes`, {
        method: 'DELETE',
        headers: this._headers
     }) //В ответ придет ХЗ что. Вероятно 200 ОК
      .then( res => res.ok)
      .then( () => {
        console.log ('Лайкнуто');
      })
      .catch((err) => {
          console.log(err, 'Ошибка');
      })
    }

    //Обновление аватара
    updateAvatar(){
      fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers, //application/json
        body: JSON.stringify({ //TODO заменить поля которые отправляем
          avatar: "ЗДЕСЬ ДОЛЖНО БЫТЬ ЗНАЧЕНИЕ ИЗ ИНПУТА"
        })
      }) //В ответ придет ХЗ что. Вероятно 200 ОК
      .then( res => {
        if (res.ok) {
          console.log ('Ава загружена успешно');
          return res.json();
        } 
        return Promise.reject(`ОШИБОЧКА ВЫШЛА: ${res.status}`);
      })
      .catch((err) => {
          console.log(err, 'Ошибка обновления аватара');
      })
    }
  }