export default class Section{
    constructor({data, renderer}, containerSelector){
        //this._renderedItems = data; //это массив данных, которые нужно добавить на страницу при инициализации класса
        this._renderer = renderer;  //функция, которая отвечает за создание и отрисовку данных на странице
        this._container = document.querySelector(containerSelector); //селектор контейнера, в который будем добавлять объект
    }

    addItem(element){ //принимает DOM-элемент и добавляет его в контейнер.
        this._container.prepend(element);
    }

    renderItems(data){ //отвечает за отрисовку всех элементов. 
        data.forEach((item) => {
        this._renderer(item);   //тут генерит элемент
        });
    }
}