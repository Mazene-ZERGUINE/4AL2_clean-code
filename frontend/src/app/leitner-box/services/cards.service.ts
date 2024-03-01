import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from 'src/app/core/models/card.model';
import { environment } from 'src/environment/environment';

export interface CardPayload {
  question: string;
  answer: string;
  tag: string;
}

@Injectable({ providedIn: 'root' })
export class CardsService {
  constructor(private http: HttpClient) {}

  private readonly apiUrl = environment.baseUrl;

  getDailyCards$(date?: string): Observable<Card[]> {
    const params = date ? new HttpParams().set('date', date) : undefined;
    return this.http.get<Card[]>(`${this.apiUrl}/cards/quizz`, { params });
  }

  getCards$(tags?: string[]): Observable<Card[]> {
    const params = tags?.length ? new HttpParams().set('tags', tags.join(',')) : undefined;
    return this.http.get<Card[]>(`${this.apiUrl}/cards`, { params });
  }

  addCard(newCard: CardPayload): Observable<Card> {
    return this.http.post<Card>(`${this.apiUrl}/cards`, newCard);
  }

  answerCard(cardId: string, isValid: boolean): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/cards/${cardId}/answer`, { isValid });
  }
}
