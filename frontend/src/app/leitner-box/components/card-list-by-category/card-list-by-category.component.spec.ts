import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListByCategoryComponent } from './card-list-by-category.component';
import { MatCardModule } from '@angular/material/card';
import { CardsService } from '../../services/cards.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { Card } from '../../../core/models/card.model';

class MockCardsService {
  getCards$(): Observable<Card[]> {
    return of([]);
  }
}

describe('CardListByCategoryComponent', () => {
  let component: CardListByCategoryComponent;
  let fixture: ComponentFixture<CardListByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardListByCategoryComponent],
      imports: [NoopAnimationsModule, MatCardModule],
      providers: [{ provide: CardsService, useClass: MockCardsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CardListByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
