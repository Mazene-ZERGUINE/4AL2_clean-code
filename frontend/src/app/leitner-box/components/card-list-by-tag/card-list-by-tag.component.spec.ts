import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListByTagComponent } from './card-list-by-tag.component';
import { CardsService } from '../../services/cards.service';
import { Observable, of } from 'rxjs';
import { Card } from '../../../core/models/card.model';

class MockCardsService {
  getCards$(): Observable<Card[]> {
    return of([]);
  }
}

describe('CardListByTagComponent', () => {
  let component: CardListByTagComponent;
  let fixture: ComponentFixture<CardListByTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardListByTagComponent],
      providers: [{ provide: CardsService, useClass: MockCardsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CardListByTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
