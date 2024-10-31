// 4. Імітація затримки API-запиту
// 	Задача: Створити Observable, що імітує API-запит із затримкою в 2 секунди та повертає результат у вигляді об’єкта { data: 'response' }.
// 	Додати до нього помилку, якщо запит триває понад 2.5 секунди.

import { catchError, delay, of, throwError, timeout } from 'rxjs';

const apiRequest = of({ data: 'response' }).pipe(delay(2000));

apiRequest.pipe(
    timeout(2500),
    catchError(() => throwError(() => new Error('Запит триває надто довго')))
).subscribe(value => console.log(value));