// 3. Асинхронне об’єднання даних
// 	Задача: Створити два Observables, один з яких генерує дані кожні 300 мс, а інший кожні 500 мс.
// 	З’єднати їх у один потік і відобразити пару значень у консолі.

import { combineLatest, interval, take } from 'rxjs';

const obs3 = interval(300).pipe(take(5));
const obs4 = interval(500).pipe(take(5));

combineLatest([obs3, obs4]).subscribe(([value1, value2]) => console.log(`Пара: (${value1}, ${value2})`));