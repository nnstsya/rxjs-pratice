// 6. Послідовні запити
// 	Задача: Створити функцію, що повертає Observable із результатом першого API-запиту.
// 	Потім виконати другий запит із результатом, залежним від першого, використовуючи switchMap.

import { Observable, of, switchMap } from 'rxjs';

function firstRequest(): Observable<string> {
    return of('data1');
}

function secondRequest(data): Observable<string> {
    return of(`second result with ${data}`);
}

firstRequest().pipe(
    switchMap(result => secondRequest(result))
).subscribe(value => console.log(value));