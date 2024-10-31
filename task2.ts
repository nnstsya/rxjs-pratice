// 2. Перетворення даних
// 	Задача: Створити Observable з масиву чисел [1, 2, 3, 4, 5].
// 	Кожен елемент має бути збільшений на 10, а потім перевірити, чи ділиться він на 2.

import { filter, from, map } from 'rxjs';

function checkIfEven(number: number): boolean {
    return number % 2 === 0;
}

const obs2 = from([1, 2, 3, 4, 5]).pipe(
    map((value) => value + 10),
    filter(value => checkIfEven(value))
);

obs2.subscribe((value) => console.log(value))