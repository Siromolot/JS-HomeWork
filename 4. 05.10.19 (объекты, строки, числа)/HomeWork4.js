"use strict";




        //ЗАДАНИЕ 1
/* Написать функцию generateCode() для генерации четырехзначного кода.
 *  Каждый новый вызов функции должен возвращать новую строку. Постараться
 *  не гуглить решение, а попробовать придумать его.
*/
function generateCode() {

    let num = 0;
    let concatNum = "";

    for (let i = 0; i < 4; ++i) {

        num = Math.floor( Math.random() * 10 );
        
        //создаем конкатенацию с использованием пустого значения (строки)
        concatNum = concatNum + num;

    } return concatNum;
}

console.log ( generateCode() );
console.log ( generateCode() );
console.log ( generateCode() );
// 2 вариант можно реализовать гораздо проще - через .slice




        //ЗАДАНИЕ 2
/* Написать функцию generatePassword(passLength) для генерации пароля,
 *  состоящего из латинских букв и цифр длиной passLength. Регистр можно оставить нижним.
 *  Постараться не гуглить решение, а попробовать придумать его. Каждый новый
 *  вызов функции должен возвращать новую строку.
*/

/*
Общая логика моего решения: 
1. С помощью функции из первого задания получаем рандомное 4-х значное число
2. Переводим полученное число в 36-разрядный формат
3. Складываем с пустой строкой concatRandomPass для начала конкатенации
4. Проверяем длину полученной строки и сравниваем с параметром passLength основной функции
5. Все это действо проходит в цикле do... while и этот цикл повторяется до достижения concatRandomPass параметра passLength
6. При необходимости обрезаем финальную строку с помощью .slice
7. Возвращаем значение
*/

function generatePassword(passLength) {

    let concatRandomPass = "";
    let randomPass = 0;

    do {
        //используем функцию получения рандомного 4-х значного числа
        randomPass = generateCode();

        //т.к. полученное значение строка - переводим в число (иначе перевод в 36-значную не сработает)
        randomPass = +randomPass;

        //переводим полученное рандомное число в 36-значное
        randomPass = randomPass.toString(36);

        //создаем конкатенацию пустого значения (строки) и полученного 36-значного кода
        concatRandomPass = concatRandomPass + randomPass;

    //цикл длится до достижения concatRandomPass параметра функции        
    } while (concatRandomPass.length < passLength);

    //проверяем, не превышает ли полученная строка требуемый параметр функции 
    if (concatRandomPass.length > passLength) {

        //скорее всего, полученное значение будет больше, чем требуется, обрезаем до требуемого
        concatRandomPass = concatRandomPass.slice(0, passLength);
    }

    return concatRandomPass;
}

console.log ( generatePassword(5) );
console.log ( generatePassword(8) );
console.log ( generatePassword(11) );
//Примечание: данная функция будет работать только при наличии функции из первого примера.
 



        //ЗАДАНИЕ 3
/* Написать функцию addZerosTo(num, strLength), принимающую два числа.
 *  Функция должна добавлять необходимое количество нулей к целому
 *  числу num, причем итоговая длина строки должна составлять
 *  strLength символов.
*/

function addZerosTo(num, strLength) {

    //для конкатенации с "0", приводим num к строке
    num = String(num);

    while (num.length < strLength) {

        num = "0" + num;

    } return num;
}

console.log( addZerosTo(3, 3) );
console.log( addZerosTo(21, 3) );
console.log( addZerosTo(325, 3) );
console.log( addZerosTo(3131, 3) );




        //ЗАДАНИЕ 4
/* Написать функцию isInstanceOfUser(any), принимающую что угодно,
 *  возвращающую true/false. true возвращать в случае, если в качестве аргумента
 *  передан объект, у которого есть только 3 следующие свойства:
 *  name и surname со строковым (!) значением и свойство age с числовым (!) значением.
 *  false возвращать во всех остальных случаях.
*/ 

function isInstanceOfUser(any) {

    //проверяем типы данных
    //вот про Object.keys(any).length === 0 подробнее - это проверка не пустой ли массив приходит к нам как параметр
    if ( typeof(any) !== "object" || any === null || any === undefined || Object.keys(any).length === 0) {

        return false;

    } else {

        for (let key in any) {

                //проверяем имена ключей
            if (key === "name" && "surname" && "age" && 

                //проверяем количество ключей 
                Object.keys(any).length === 3 &&

                //проверяем типы значений
                typeof ( any["name"] ) === "string" && typeof ( any["surname"] ) === "string" && typeof ( any["age"] ) === "number") {

                    return true;

                } else {

                    return false;
                }
        }
    }
}

let vasya = {
    name: 'Вася',
    surname: 'Пупкин',
    age: 15,
};

let masha = {
    age: 17.5,
    name: 'Маша',
    surname: 'Пупкина',
    isAdmin: false,
};

let petya = {
    name: 'Петя',
    dateOfBirth: '21.12.2012'
};

console.log(isInstanceOfUser(vasya)); // true
console.log(isInstanceOfUser(masha)); // false
console.log(isInstanceOfUser(petya)); // false
console.log(isInstanceOfUser(17)); // false
console.log(isInstanceOfUser(false)); // false
console.log(isInstanceOfUser('trololo')); // false
console.log(isInstanceOfUser({})); // false
console.log(isInstanceOfUser(null)); // false
console.log(isInstanceOfUser(undefined)); // false
console.log(isInstanceOfUser(function() {})); // false




        //ЗАДАНИЕ 5
/* Написать функцию глубокого (!) копирования объекта deepCopy(source),
 * возвращающую новый объект, не имеющий никаких ссылок и связей с source.
 * Другими словами, при изменении любого свойства нового объекта,
 * либо его вложенных объектов, если они есть, объект source должен оставаться
 * прежним и неизмененным.
*/

// (!) Выполнено в двух вариантах и дабы посмотреть результат 1 варианта в браузере, необходимо скачать в директорию библиотеку lodash

//1 вариант - через подключение библиотеки Lodash и через метод _.cloneDeep
//Что примечательно по результатам теста - результат использования Lodash прекрасно отображается в браузере, но дает undefined в IDE (тестил на VSCode)
function deepCopy(source) {

    let cloneObject = _.cloneDeep(source);
    return cloneObject;
}


//2 вариант - ручное глубокое клонирование
function deepCopy(source) {

    //создаем новый объект - клон
    let cloneObject = {};

        //"вытаскиваем" все ключи из имеющегося объекта (параметра функции)
        for (let key in source) {

            //клонируем все ключи имеющегося объекта в новый объект
            cloneObject[key] = source[key];

            //проверяем, нет ли в изначальном объекте свойств, которые сами являются объектом
            if (typeof (source[key])  === "object") { // вот здесь надо еще дописать: source[key] !== null, ибо typeof null  - тоже выдает object

            //если есть, то и их клонируем через вызов функции самой себя внутри себя (но с другим параметром)
            cloneObject[key] = deepCopy( source[key] );

            }

        }  return cloneObject;
}

//выполняем все перечисленные Вами проверки
let user = {
    name: 'Вася',
    isAdmin: false,
    sayName() { alert(this.name); },
    nullField: null,
    undefinedField: undefined,
    address: {
      street: 'Красная площадь',
      house: '1',
      coordinates: {
        lat: 55.7552944,
        lng: 37.6176822
      }
    }
  };

  let admin = deepCopy(user);
  admin.name = 'Петя';
  admin.address.street = '';
  admin.address.coordinates.lat = 0;
  // user при этом не изменился!
  
  console.log(user.name === 'Вася'); // true
  console.log(user.address.street === 'Красная площадь'); // true
  console.log(user.address.coordinates.lat === 55.7552944); // true
  user.sayName(); // 'Вася'
  admin.sayName(); // 'Петя'
