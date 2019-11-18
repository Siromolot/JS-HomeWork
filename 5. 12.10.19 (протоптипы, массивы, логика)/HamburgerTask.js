"use strict";

/*
Некая сеть фастфудов предлагает несколько видов гамбургеров:
  - маленький (50 тугриков, 20 калорий)
  - большой (100 тугриков, 40 калорий)

 Гамбургер может быть с одним из нескольких видов начинок (обязательно):
  - сыром (+ 10 тугриков, + 20 калорий)
  - салатом (+ 20 тугриков, + 5 калорий)
  - картофелем (+ 15 тугриков, + 10 калорий)

 Дополнительно гамбургер можно посыпать приправой (+ 15 тугриков, 0 калорий) и полить майонезом (+ 20 тугриков, + 5 калорий).

 Необходимо написать программу, расчиытвающую стоимость и калорийность гамбургера.
 Обязательно использовать ООП подход НА ПРОТОТИПАХ (подсказка: нужен класс Гамбургер, константы, методы для выбора опций
 и расчета нужных величин).
 Код должен быть защищен от ошибок. Представь, что твоим классом будет пользоваться другой программист.
 Если он передает неправильный тип гамбургера, например, или неправильный вид добавки,
 должно выбрасываться исключение (ошибка не должна молча игнорироваться).
 О том, как выбрасывать исключения, обрабатывать их и создавать свои собственные
 объекты ошибок, можно самостоятельно почитать здесь http://learn.javascript.ru/error-handling

 Написанный класс должен соответствовать следующему jsDoc описанию: http://usejsdoc.org/
 (то есть содержать указанные методы, которые принимают и возвращают данные указанного типа
 и выбрасывают исключения указанного типа. Комментарии ниже можно и нужно скопировать в свой код):
 */

 
/**
 * Класс, объекты которого описывают параметры гамбургера.
 *
 * @constructor
 * @param size        Размер
 * @param stuffing    Начинка
 * @throws {HamburgerException}  При неправильном использовании
 */

class Hamburger {
    constructor(size, stuffing) { // - здесь вопрос: в специальном комментарии стоит к использованию @constructor, но он не "пришивается" (по крайней мере, по моим тестам) к функции-конструктору, которая у нас в задании стоит к заполнению по умолчанию. Т.е, встаем перед выбором - или ставить класс и constructor или оставлять функцию-конструктор, но уже без constructor. Я правильно понял? Так как у нас в заданиях везде написано про класс, я все же переделал функцию-конструктор в класс. Надеюсь, не ошибся.
        this.size = size;        
        this.stuffing = stuffing;
        this.topping = new Set();

        try{
            if (!size && !stuffing) {
                throw new Error ("HamburgerException: no size and stuffing given");
            }
            if (size !== Hamburger.SIZE_LARGE && size !== Hamburger.SIZE_SMALL) {
                throw new Error ("HamburgerException: invalid size");
            }
            if (stuffing !== Hamburger.STUFFING_CHEESE &&
                stuffing !== Hamburger.STUFFING_SALAD &&
                stuffing !== Hamburger.STUFFING_POTATO) {
                throw new Error ("HamburgerException: invalid stuffing");
            }
        } 

        catch(err) {
            console.log(err.message);
        }
    } 
}


/* Размеры, виды начинок и добавок */
// Виды бургеров
Hamburger.SIZE_SMALL = {
    price: 50,
    calories: 20,
};

Hamburger.SIZE_LARGE = {
    price: 100,
    calories: 40,
};

// Виды обязательных начинок
Hamburger.STUFFING_CHEESE = {
    price: 10,
    calories: 20,
};

Hamburger.STUFFING_SALAD = {
    price: 20,
    calories: 5,
};

Hamburger.STUFFING_POTATO = {
    price: 15,
    calories: 10,
} ;

// Виды опциональных добавок
Hamburger.TOPPING_MAYO = {
    price: 20,
    calories: 5,
};

Hamburger.TOPPING_SPICE = {
    price: 15,
    calories: 0,
};


/**
 * Добавить добавку к гамбургеру. Можно добавить несколько
 * добавок, при условии, что они разные.
 *
 * @param topping     Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */

Hamburger.prototype.addTopping = function(topping) {
    
    try{
        if (topping !== Hamburger.TOPPING_MAYO &&
            topping !== Hamburger.TOPPING_SPICE) {
            throw new Error ("HamburgerException: invalid topping");
        }

        if (!this.topping.has(topping)) {
            this.topping.add(topping);
        } else {
            throw new Error ("HamburgerException: duplicate topping. There can be only one");
            // https://yandex.ru/images/search?from=tabbar&text=there%20can%20be%20only%20one&pos=8&img_url=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F5c%2F3d%2F5d%2F5c3d5de5b7060409838b7758721fa206.jpg&rpt=simage
        }
    }

    catch(err) {
        console.log(err.message);
    }
};


/**
 * Убрать добавку, при условии, что она ранее была
 * добавлена.
 *
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */

Hamburger.prototype.removeTopping = function(topping) {

    try {
        if(this.topping.has(topping)) {
            this.topping.delete(topping);
        } else {
            throw new Error ("HamburgerException: there's no such topping");
        }
    }
        catch(err) {
            console.log(err.message);
        }
    };


/**
 * Получить список добавок.
 *
 * @return {Array} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_*
 */

Hamburger.prototype.getToppings = function()  {
    return this.topping;
};


/**
 * Узнать размер гамбургера
 */

Hamburger.prototype.getSize = function() {
    return this.size;
};


/**
 * Узнать начинку гамбургера
 */

Hamburger.prototype.getStuffing = function() {
    return this.stuffing;
};


/**
 * Узнать цену гамбургера
 * @return {Number} Цена в тугриках
 */

Hamburger.prototype.calculatePrice = function() {
    let toppingSumPrice = 0;
    for (let value of this.topping) {
        toppingSumPrice += value.price;
    }
    return this.size.price + this.stuffing.price + toppingSumPrice;
};


/**
 * Узнать калорийность
 * @return {Number} Калорийность в калориях
 */

Hamburger.prototype.calculateCalories = function() {
    let toppingSumCalories = 0;
    for (let value of this.topping) {
        toppingSumCalories += value.calories;
    } 
    return this.size.calories + this.stuffing.calories + toppingSumCalories;
};


/**
 * Представляет информацию об ошибке в ходе работы с гамбургером.
 * Подробности хранятся в свойстве message.
 * @constructor
 */

function HamburgerException(message) {
    Error.call(this, message);
    this.name ="HamburgerException";
    this.message = message;
    if(Error.captureStackTrace) {
        Error.captureStackTrace(this, HamburgerException);
    } else {
        this.stack = (new Error()).stack;
    }
} // скопипащено из чата. Осталось разобраться, что же это )


// --------------------------------------------------------------------------------
/* P.S. к первой части задания (файл HomeWork5.js) - там в 4 задании в 4 вопросе в функции стоит следующая строка (arguments[2] = 10;) и вопрос,
поменяет ли она значения аргументов функции. Я указал, что это вероятно, обращение к некой необъявленной переменной, но после решения "Гамбургера" теперь знаю,
что это старое обращение к аргументам. Кстати, в строгом режиме не работающее.
Так что мой ответ "3" так и останется таким (ибо strict mode - это хорошо), но объяснение ответа получается другое */
// --------------------------------------------------------------------------------


// маленький гамбургер с начинкой из сыра
const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);

// добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);

// спросим сколько там калорий
console.log('Calories:', hamburger.calculateCalories());

// сколько стоит
console.log('Price:', hamburger.calculatePrice());

// я тут передумал и решил добавить еще приправу
hamburger.addTopping(Hamburger.TOPPING_SPICE);

// А сколько теперь стоит?
console.log('Price with sauce:', hamburger.calculatePrice());

// Проверить, большой ли гамбургер?
console.log('Is hamburger large:', hamburger.getSize() === Hamburger.SIZE_LARGE); // -> false

// Убрать добавку
hamburger.removeTopping(Hamburger.TOPPING_SPICE);
console.log('Toppings size', hamburger.getToppings().size); // т.к. мы используем для топпингов Set, то кол-во элементов проверяем не с помощью .length, а с помощью .size


/*
  При неправильном использовании класс сообщает об этом с помощью выброса исключения:
 */

// не передали обязательные параметры
const h2 = new Hamburger(); // => HamburgerException: no size given

// передаем некорректные значения, добавку вместо размера
const h3 = new Hamburger(Hamburger.TOPPING_SPICE, Hamburger.TOPPING_SPICE);
// => HamburgerException: invalid size 'TOPPING_SAUCE'

// добавляем много добавок
const h4 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
h4.addTopping(Hamburger.TOPPING_MAYO);
/* (!) здесь, скорее всего, должно быть добавление топпингов к h4 (заменил на него), а не к hamburger (как было изначально),
иначе мы сразу получим два выброса ошибки, ибо получается, что добавляем не к новосозданному h4, а к уже ранее созданному hamburger,
который уже имеет топпинги*/
h4.addTopping(Hamburger.TOPPING_MAYO);
// HamburgerException: duplicate topping 'TOPPING_MAYO'



