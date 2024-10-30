// 5. Робота з натисканням кнопок
// 	Задача: Створити подію, що буде спрацьовувати на натискання кнопки.
// 	Використайте оператори для відсівання швидких натискань та щоб зупинити підписку, коли натискання перевищує 5 разів.

const { fromEvent } = rxjs;
const { take, throttleTime } = rxjs.operators;

const button = document.getElementById('button');
fromEvent(button, 'click').pipe(
    throttleTime(1000),
    take(5)
).subscribe(() => console.log('Кнопка натиснута'));