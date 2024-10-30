import { Component, DestroyRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IUser, SomeService } from './some-service.service';
import { FormsModule } from '@angular/forms';
import { of, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'foo';
  public id: number = 0;
  public name: string = '';

  constructor(private someService: SomeService, private destroyRef: DestroyRef) { }

  public getData(): void {
    this.someService.getSomeData(this.id).pipe(
      switchMap((response: any) => this.someService.getUserData(response)),
      switchMap((data: IUser | undefined) => {
        if (!data) {
          return of('User with such id was not found');
        }
        return this.someService.getMetadata(data.name);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (response: string) => this.name = response,
      error: error => console.log(error)
    });
  }
}

// Обґрунтування: вкладені підписки можуть ускладнити логіку коду і викликати витоки пам'яті, якщо одна з підписок не буде відписана,
// тому було використано оператор switchMap, який об'єднав кілька асинхронних запитів в один потік даних.
