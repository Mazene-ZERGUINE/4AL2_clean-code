import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from 'src/app/core/models/card.model';

@Injectable({ providedIn: 'root' })
export class CardsService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8080';

  getDailyCards$(date?: string) {
    const params = date ? new HttpParams().set('date', date) : undefined;
    return this.http.get<Card[]>(`${this.apiUrl}/cards/quizz`, { params });
  }

  getCards$(tags?: string[]): Observable<Card[]> {
    const params = tags?.length ? new HttpParams().set('tags', tags.join(',')) : undefined;
    return this.http.get<Card[]>(`${this.apiUrl}/cards`, { params });
  }

  addCard(newCard: Card): Observable<Card> {
    const { question, answer, tag } = newCard;
    return this.http.post<Card>(`${this.apiUrl}/cards`, { question, answer, tag });
  }
}
