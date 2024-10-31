// 8. Обробка помилок
// 	Задача: Створити Observable, який має певну ймовірність викинути помилку (наприклад, 30%).
// 	Якщо помилка трапляється, замість завершення потоку відновлювати його, використовуючи запасні дані.

import { catchError, delay, Observable, of, switchMap } from 'rxjs';

const obs5 = new Observable(subscriber => {
    const randomValue = Math.random();
    if (randomValue < 0.3) {
        subscriber.error(new Error('Щось пішло не так, використовуємо запасні дані...'));
    } else {
        subscriber.next('Дані');
        subscriber.complete();
    }
}).pipe(
    catchError((err, caught) => {
        console.error('Помилка:', err.message);
        return caught
            .pipe(
                delay(1000),
                switchMap(() => of('Запасні дані'))
            );
    }),
);

obs5.subscribe(data => console.log('Отримані дані:', data));
