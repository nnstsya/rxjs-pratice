// 1. Основи операторів RxJS
// Задача: Створити простий Observable, який виводить в консоль значення чисел від 1 до 5 з інтервалом у 500 мс.
// По завершенню вивести повідомлення “Завершено”.

import { finalize, interval, map, take } from 'rxjs';

const obs1 = interval(500).pipe(
    take(5),
    map(value => value + 1),
    finalize(() => console.log('Завершено'))
);

obs1.subscribe(value => console.log(value));