// 8. Обробка помилок
// 	Задача: Створити Observable, який має певну ймовірність викинути помилку (наприклад, 30%).
// 	Якщо помилка трапляється, замість завершення потоку відновлювати його, використовуючи запасні дані.

import { catchError, delay, of, retryWhen, switchMap, tap, throwError } from 'rxjs';

const obs5 = of([]).pipe(
    switchMap(() => Math.random() < 0.3
        ? throwError(() => new Error('Щось пішло не так, використовуємо запасні дані...'))
        : of('Дані')
    ),
    catchError(err => {
        console.error('Помилка:', err.message);
        return of('Запасні дані');
    }),
    retryWhen(errors =>
        errors.pipe(
            delay(1000)
        )
    ),
    tap((data) => {
        console.log('Отримані дані:', data);
    })
);

obs5.subscribe();
