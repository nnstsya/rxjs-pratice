// 10. Відстеження інтервалу часу з scan та timestamp
// 	Задача: Створити потік, що генерує значення кожні 300 мс протягом 2 секунд.
// 	Відстежити, скільки часу пройшло з початку до кожної наступної події.

import { interval } from 'rxjs';
import { take, timestamp, scan } from 'rxjs/operators';

interval(300).pipe(
    take(7),
    timestamp(),
    scan((acc, curr) => {
        const timePassed = curr.timestamp - acc.startTimestamp;
        console.log(`Минуло: ${timePassed} мс`);
        return { ...curr, startTimestamp: acc.startTimestamp };
    }, { startTimestamp: Date.now() })
).subscribe();
