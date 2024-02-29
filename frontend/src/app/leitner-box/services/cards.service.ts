import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { Observable } from 'rxjs';
=======
import { Observable, delay } from 'rxjs';
>>>>>>> f5a8d35 (adding quizz stepper, button for adding list, and improving forms)
import { Card } from 'src/app/core/models/card.model';

@Injectable({ providedIn: 'root' })
export class CardsService {
  constructor(private http: HttpClient) {}

  getCards$(): Observable<Card[]> {
<<<<<<< HEAD
    return this.http.get<Card[]>('http://localhost:3000/cards');
  }

  addCard(newCard: Card): Observable<Card> {
=======
    return this.http.get<Card[]>('http://localhost:3000/cards').pipe(delay(1000));
  }

  addCard(newCard: Card): Observable<Card> {
    console.log(newCard);
>>>>>>> f5a8d35 (adding quizz stepper, button for adding list, and improving forms)
    return this.http.post<Card>('http://localhost:3000/cards', newCard);
  }
}
