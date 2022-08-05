//Класс UserInfo отвечает за управление отображением информации о пользователе на странице

//Принимает в конструктор объект с селекторами трех элементов: элемента имени пользователя и элемента информации о себе.
//const userName = profileContainer.querySelector('.profile__name'); //Имя пользователя
//const userProfession = profileContainer.querySelector('.profile__profession'); //Профессия пользователя

export default class UserInfo {
    constructor({name, profession, avatar}){
        this._name = document.querySelector(name);
        this._profession = document.querySelector(profession);
        this._avatar = document.querySelector(avatar);

    }

    getUserInfo(){ //возвращает объект с данными пользователя. Этот метод пригодится когда 
        //данные пользователя нужно будет подставить в форму при открытии.
        const userInfoData = {
            name: this._name.textContent,
            profession: this._profession.textContent,
            avatar: this._avatar.src
        }   
        return userInfoData;     
    }

    setUserInfo(data){ //принимает новые данные пользователя и добавляет их на страницу.
        this._name.textContent = data.name;
        this._profession.textContent = data.about;
        this._avatar.src = data.avatar;
        
        console.log('Лежит в профиле', this._name.textContent);
        console.log('Лежит в профиле', this._profession.textContent);
        console.log('Лежит в профиле', this._avatar.src);

        console.log('Положили в name', data.name);
        console.log('Положили в профессион', data.profession);
        console.log('в аватар', data.avatar);
    }
}