// 7. Робота з Subject
// 	Задача: Створити Subject, який обробляє дані (наприклад, рядок) та передає їх двом підписникам.
// 	Один підписник відображає отримані дані як є, а другий - у верхньому регістрі.

import { Subject } from 'rxjs';

const subj = new Subject();

subj.subscribe((data: string) => console.log('Перший підписник:', data));
subj.subscribe((data: string) => console.log('Другий підписник:', data.toUpperCase()));

subj.next('Hello');