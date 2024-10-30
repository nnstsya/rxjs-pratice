// 9. Використання mergeMap для паралельної обробки
// 	Задача: Імітувати три незалежних API-запити, що виконуються паралельно.
// 	Після завершення кожного вивести його результат у консоль.
// 	Зупинити весь потік, якщо один з запитів повертає помилку.

import { finalize, from, mergeMap, of, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const requests = [
    of('data1'),
    throwError(() => new Error('Помилка в запиті 3')),
    of('data2'),
];

from(requests).pipe(
    mergeMap(request =>
        request.pipe(
            catchError(error => throwError(() => error))
        )
    ),
    tap(result => console.log(result)),
).subscribe({
    error: error => console.error('Потік завершився з помилкою:', error),
    complete: () => console.log('Усі запити успішно завершені')
});
