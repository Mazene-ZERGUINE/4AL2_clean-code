import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListByTagComponent } from './card-list-by-tag.component';
import { CardsService } from '../../services/cards.service';
import { Observable, of } from 'rxjs';
import { Card } from '../../../core/models/card.model';
import { MoreActionService } from '../../../shared/services/utils/more-actions.service';
import { ActivatedRoute } from '@angular/router';

class MockCardsService {
  getCards$(): Observable<Card[]> {
    return of([]);
  }
}

class MockMoreActionService {}

const activatedRouteMock = {
  queryParams: of({}),
};

describe('CardListByTagComponent', () => {
  let component: CardListByTagComponent;
  let fixture: ComponentFixture<CardListByTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardListByTagComponent],
      providers: [
        { provide: CardsService, useClass: MockCardsService },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        {
          provide: MoreActionService,
          useClass: MockMoreActionService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CardListByTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
