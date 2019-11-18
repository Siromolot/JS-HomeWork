"use strict";   
   


        //ЗАДАНИЕ 1
// Чему равен result в следующем примере?
let x = 3;
let y = 6;

let result = -y++ - 5 + (x *= ++y + 2) / x++; //result = -10




        //ЗАДАНИЕ 2
// Создать страницу, которая спрашивает у пользователя имя, а затем приветствует его
let userName = prompt("Как Вас зовут?");

if (!!userName == true) {
    alert("Приветствую, " + userName + "!");
} else {
    alert("Вы отменили ввод имени");
}




        //ЗАДАНИЕ 3
/* Попросить пользователя ввести 2 числа A и B. Используя конструкцию if...else, вывести ему информацию о том,
какое число больше, A или B.
*/
let number1 = +prompt("Введите первое число к сравнению", "");
let number2 = +prompt("Введите второе число к сравнению", "");

if (number1 === "" || number1 === false || number2 === "" || number2 === false) {
    alert("Похоже, Вы не ввели одно или оба числа");
/* другая проверка на то, что ввел пользователь: 
if(isNaN(number1) || isNaN(number2)) {...
Эта функция показывает, что введенное значение NaN, т.е. не число (в код не вставил)
*/
} else if (number1 > number2) {
    alert("Число " + number1 + " больше");
} else if (number1 === number2) {
    alert("Вы ввели одинаковые числа");
} else {
    alert("Число " + number2 + " больше");
}




        //ЗАДАНИЕ 4
/* Попросить ввести пользователя число от 1 до 100. Вывести интересную информацию о полученном числе:
 *  - Четное/нечетное, делится ли на 3, 5, 7.
 *  - Сколько цифр в числе
 *  - Есть ли какие-то связанные поверья (счастливое/несчастливое), названия из лото, какая-то другая информация,
 *    достаточно 5-7 "особых" чисел с такими дополнительными записями
 *  - В случае, если число не в диапазоне от 1 до 100, то вывести ошибку.
 */

let randomNum = +prompt("Введите любое число от 1 до 100", "");

//проверка на true'шность
if (randomNum === null || randomNum === "" || randomNum === 0) {
     alert ("Вы отменили ввод, задали пустое значение или ввели ноль. Попробуйте еще раз");
    
//проверка на деление сразу на все числа (3, 5, 7) просто ради тренировки 
} else if (randomNum % 3 === 0 && randomNum % 5 === 0 && randomNum % 7 === 0) {
    alert("Делится на 3, 5 и 7. Круто, что вы нашли это число, но оно больше 100. Мы так не договаривались, поэтому больше ничего не скажу");
    
//проверка на соответствие оговоренным условиям диапазона чисел    
} else if (randomNum < 1 || randomNum > 100) {
     alert("Вы ввели число о котором мы не договаривались");
    
} else {
    //проверка на четность/нечетность
    if (randomNum % 2 === 0) {
         alert("Число четное");
    } else {
        alert("Число нечетное");
    }
    
    //проверка на возможность деления на 3, 5, 7
    if (randomNum % 3 === 0 && randomNum % 5 === 0) {
        alert ("Число делится на 3 и 5 одновременно");
    } else if (randomNum % 3 === 0 && randomNum % 7 === 0) {
        alert("Число делится на 3 и 7 одновременно");
    } else if (randomNum % 5 === 0 && randomNum % 7 === 0) {
        alert ("Число делится на 5 и 7 одновременно");
    } else if (randomNum % 3 === 0) {
        alert ("Число делится на 3");
    } else if (randomNum % 5 === 0) {
        alert ("Число делится на 5");
    } else if (randomNum % 7 === 0) {
        alert ("Число делится на 7")
    } else {
        alert ("Число не делится ни на 3, ни на 5, ни на 7");
    }
    /*в вышеописанном задании вместо кучи alert'ом можно изначально определить в блоке некую переменную message,
    в которую записывать по этому коду(msg += "...some message...")и уже в конце поставить общий alert*/ 
    
    //"факты" о числах
    if (randomNum === 13) {
         alert("Я вижу, Вы не суеверный, да?");
    } else if (randomNum === 77) {
        alert("О, семерочки на удачу )");
    } else if (randomNum === 69) {
        alert ("Гм... DeadPool гордился бы тобой ) ");
    } else if (randomNum === 6) {
        alert("Отлично! Вы выбрали мое нелюбимое число");
    } else if (randomNum === 1 || randomNum === 99) {
        alert ("Вы всегда выбираете крайние значения? Человек крайностей?");
    } else {
        alert ("Про это число у меня шуток нет");
    }
    
    //подсчет количества символов в введенном числе
    if (!!randomNum == true) {
        randomNum = String(randomNum);
        alert ("В числе " + randomNum.length + " знаков");
    }
        /*вот здесь можете пинать меня ногами, но я не придумал более изящного решения, нежели перевести число в строку
        и найти количество символов при помощи .length (тестил для чисел - у меня это не сработало)
        Хотя, с другой стороны - а чего пинать то? Работает же )) 
        Далее, если новоиспеченная строка нам понадобится как число, мы снова сможем вернуть это значение в ряды чисел*/
        /*НО! есть и второе решение, путем сравнения переменной с 10, 100 и т.д. Если допустимая область небольшая - ок, но если число может быть овер до хера большое - не совсем хорошее решение*/
}




        //ЗАДАНИЕ 5
/* Есть блок-схема: https://bit.ly/2OIJXF5
 *  Написать код, который будет спрашивать логин пользователя (использовать prompt).
 *  Если посетитель вводит "Админ", то спрашивать пароль,
 *  если нажал кнопку "отмена" (или клавишу escape), то выводить "Вход отменён",
 *  если ввёл что-то другое – сообщение "Я вас не знаю".
 *  Валидацию пароля тоже проверять. Если введён пароль "Чёрный Властелин",
 *  то выводить "Добро пожаловать!", иначе – "Пароль неверен", при отмене – "Вход отменён".
 */ 

let currentUser = prompt("Введите Ваше имя, пожалуйста", "");

if (currentUser === "Админ") {
    let password = prompt("Введите пароль", "");
    if (password === "Чёрный Властелин") {
        alert("Добро пожаловать!");
    } else if (password === null || password === "") {
        alert("Вход отменен");
    } else {
        alert("Пароль неверен");
    }

} else if (currentUser === null || currentUser === "") {
    alert("Вход отменен");

} else {
    alert("Я Вас не знаю");
}




        //ЗАДАНИЕ 6
/* Мы изучаем самый прекрасный язык на свете, а все остальные языки ему завидуют!..
Какой результат дадут следующие выражения? Прокомментировать каждую строку
 */

console.log("" + 1 + 0);//10
//т.к. строка идет первой и после нее знак плюс, идет конкатенация и все численные значения превращаются в строки

console.log("" - 1 + 0); //-1
//т.к. пустая строка приравнивается к 0 и идет после нее знак минус, далее идут мат.вычисления

console.log(true + false); //1
//true и false приравниваются к числам 1 и 0, далее мат.вычисления

console.log(6 / "3"); //2
//любой мат.оператор (за исключнием "+") приравниает строки к числам. Соответственно, идут мат.вычисления

console.log("2" * "3"); //6
//любой мат.оператор (за исключнием "+") приравниает строки к числам. Соответственно, идут мат.вычисления

console.log(4 + 5 + "px"); //9px
//левая часть выполняется до "столкновения" со строкой, далее идет конкатенация

console.log("$" + 4 + 5); //$45
//т.к. строка идет первой и стоит знак "+", идет конкатенация строк (все численные значения переводятся в строки)

console.log("4" - 2); //2
//любой мат.оператор (за исключнием "+") приравниает строки к числам. Соответственно, идут мат.вычисления

console.log("4px" - 2); //NaN
//4px не может быть переведно в число, поэтому получаем что это не число
/*есть функция parseInt("4px"), которая вытащит целую цифру и parseFloat("4.23px") вытащит значение с плавающей точкой 4,23*/

console.log(7 / 0); //Infinity
/*хз почему так, в правилах языка так прописано - узнал об этом в учебнике JS. Математики бы удавились ))
Кстати, крутое видео на эту тему, очень рекомендую:
https://www.youtube.com/watch?v=c-ng-iMJmNo
*/

console.log("  -9\n" + 5); //-9\n5
/*проверил после написания ответа по console.log - оказалось, что идет перенос строки за счет обратного слеша с n. Не знал.
Соответственно, "\n" отображаться не будет, но конкатенация останется*/

console.log("  -9\n" - 5); //-14
//"\n" считается за пустоту, а значит удаляется из расчетов и идет обычное вычитание

console.log(5 && 2); //2
// оператор && выдает либо первое ложное, либо последнее истинное, если ложных нет

console.log(2 && 5); //5
// оператор && выдает либо первое ложное, либо последнее истинное, если ложных нет

console.log(5 || 0); //5
//оператор || выдает первое истинное или последнее ложное, если истинных нет. Здесь 5 - истина, 0 - ложь

console.log(0 || 5); //5
//оператор || выдает первое истинное или последнее ложное, если истинных нет. Здесь 0 - ложь, 5 - истина

console.log(null + 1); //1
//null приравнивается к числу 0. Далее мат.вычисления

console.log(undefined + 1); //NaN
//undefined приводится к NaN, соответственно и сумма будет NaN

console.log(null == "\n0\n"); //false
//так то справа тоже ноль, но null может быть равен только undefined и больше ничему другому

console.log(+null == +"\n0\n"); //true
//унарный плюс превращает null в число 0, соответственно вышенаписанное мною правило о равенстве только undefined уже не работает

console.log(0 || "0" && {}); //{}
/*сначала вычисляется && - и там и там истинные значения, значит по правилам выбираем последнее истинное "{}" - объект.
Далее сравниваем с || - тут по правилам возвращается первое истинное, либо последнее ложное. В данном случае, 0 - ложь, "{}" - истина.*/

console.log(!!"false" == !!"true"); //true
//"!!" превращают значения в булевые. Неважно, что там написано, они оба превратятся в true (т.к. там не NaN, undefined, null, "", 0)

console.log("foo" + + "bar"); //fooNaN
//+"bar" превратится в численный тип, но так как числом этот набор букв стать не может, будет NaN. Ну а далее конкатенация с ним и NaN превратится в строку

console.log(true == 'true'); //false
/*Сначала написал true... С одной стороны - здесь справа не пустая строка и она, по сути, ведь true и равенство не строгое. Но видимо этого недостаточно. Проверил, поставив "!!" перед строкой - все сработало, этот механизм понятен. А тут приравнивается к числам, true == 1 и "true* == NaN. Соответственно, 1 != NaN*/

console.log(false == 'false'); //false
//по аналогии с предыдущим примером