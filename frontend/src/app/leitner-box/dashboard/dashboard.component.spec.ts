import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { CardsService } from '../services/cards.service';
import { Observable, of } from 'rxjs';
import { Card } from '../../core/models/card.model';
import { CardListByTagComponent } from '../components/card-list-by-tag/card-list-by-tag.component';

class MockCardsService {
  getCards$(): Observable<Card[]> {
    return of([]);
  }
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, CardListByTagComponent],
      providers: [{ provide: CardsService, useClass: MockCardsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
