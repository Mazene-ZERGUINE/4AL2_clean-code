import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { Card } from 'src/app/core/models/card.model';

@Injectable({ providedIn: 'root' })
export class CardsService {
  constructor(private http: HttpClient) {}

  getCards$(): Observable<Card[]> {
    return this.http.get<Card[]>('http://localhost:3000/cards').pipe(delay(1000));
  }

  addCard(newCard: Card): Observable<Card> {
    console.log(newCard);
    return this.http.post<Card>('http://localhost:3000/cards', newCard);
  }
}
