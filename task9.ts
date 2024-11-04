// 9. Використання mergeMap для паралельної обробки
// 	Задача: Імітувати три незалежних API-запити, що виконуються паралельно.
// 	Після завершення кожного вивести його результат у консоль.
// 	Зупинити весь потік, якщо один з запитів повертає помилку.

import { from, mergeMap, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

function randomError() {
    const randomValue = Math.random();
    return randomValue < 0.3;
}

function createObservable() {
    return new Observable(subscriber => {
        const isThereAnError = randomError();
        if (isThereAnError) {
            subscriber.error(new Error('Щось пішло не так'));
        } else {
            subscriber.next('Дані');
            subscriber.complete();
        }
    });
}

const obs1 = createObservable();
const obs2 = createObservable();
const obs3 = createObservable();

const requests = [obs1, obs2, obs3];

from(requests).pipe(
    mergeMap(request =>
        request.pipe(
            catchError(error => throwError(() => error))
        )
    ),
).subscribe({
    next: value => console.log(value),
    error: error => console.error('Потік завершився з помилкою:', error),
    complete: () => console.log('Усі запити успішно завершені')
});
