//Класс UserInfo отвечает за управление отображением информации о пользователе на странице

//Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
//const userName = profileContainer.querySelector('.profile__name'); //Имя пользователя
//const userProfession = profileContainer.querySelector('.profile__profession'); //Профессия пользователя

export default class UserInfo {
    constructor({name, profession}){
        this._name = document.querySelector(name);
        this._profession = document.querySelector(profession);

    }

    getUserInfo(){ //возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
        const userInfoData = {
            name: this._name.textContent,
            profession: this._profession.textContent
        }   
        return userInfoData;   
        //return {name: this._name.textContent, profession: this._profession.textContent};  
    }

    setUserInfo(data){ //принимает новые данные пользователя и добавляет их на страницу.
        this._name.textContent = data.name;
        this._profession.textContent = data.profession;
    }
}