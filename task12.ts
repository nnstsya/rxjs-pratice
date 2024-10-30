// 12. Для цього завдання використати оператор from, об’єднати декілька стрімів використовуючи switchMap, mergeMap, concatMap та exhaustMap. ]
// Вивести їх по черзі, а також змінити порядок, подивитись що змінилось і якщо є зміни або їх немає, пояснити чому.

import { of, tap } from 'rxjs';
import { delay, switchMap, mergeMap, concatMap, exhaustMap } from 'rxjs/operators';

const oneSecondSource = of('1 second http request').pipe(delay(1000));
const twoSecondSource = of('2 second http request').pipe(delay(2000));
const threeSecondSource = of('3 second http request').pipe(delay(3000));
const fourSecondSource = of('4 second http request').pipe(delay(4000));
const fiveSecondSource = of('5 second http request').pipe(delay(5000));

of(oneSecondSource, twoSecondSource, threeSecondSource, fourSecondSource, fiveSecondSource).pipe(
    switchMap(source => source),
    tap(result => console.log('switchMap:', result))
).subscribe();

of(oneSecondSource, twoSecondSource, threeSecondSource, fourSecondSource, fiveSecondSource).pipe(
    mergeMap(source => source),
    tap(result => console.log('mergeMap:', result))
).subscribe();

of(oneSecondSource, twoSecondSource, threeSecondSource, fourSecondSource, fiveSecondSource).pipe(
    concatMap(source => source),
    tap(result => console.log('concatMap:', result))
).subscribe();

of(oneSecondSource, twoSecondSource, threeSecondSource, fourSecondSource, fiveSecondSource).pipe(
    exhaustMap(source => source),
    tap(result => console.log('exhaustMap:', result))
).subscribe();


// switchMap: коли надходить нове джерело, switchMap скасовує попередні запити і починає новий. Тому виводиться лише fiveSecondSource.
// mergeMap: всі результати вивелись по мірі їх готовності, не чекаючи на завершення попередніх, бо mergeMap дозволяє паралельно виконувати всі запити.
// concatMap: concatMap виконує запити послідовно. Перший запит має завершитися перед тим, як почнеться наступний. Результати вивелись у порядку, в якому запити були створені.
// exhaustMap: exhaustMap ігнорує нові запити, поки попередній не завершиться. Тому всі запити окрім першого проігнорувались.