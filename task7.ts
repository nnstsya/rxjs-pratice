// 7. Робота з Subject
// 	Задача: Створити Subject, який обробляє дані (наприклад, рядок) та передає їх двом підписникам.
// 	Один підписник відображає отримані дані як є, а другий - у верхньому регістрі.

import { map, Subject } from 'rxjs';

const subj = new Subject();

subj.subscribe((data: string) => console.log('Перший підписник:', data));
subj.pipe(
    map((data: string) => data.toUpperCase())
).subscribe(data => console.log('Другий підписник:', data));

subj.next('Hello');