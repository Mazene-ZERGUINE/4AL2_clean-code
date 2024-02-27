import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { CardsService } from '../services/cards.service';
import { Observable, of } from 'rxjs';
import { Card } from '../../core/models/card.model';
import { CardListByTagComponent } from '../components/card-list-by-tag/card-list-by-tag.component';
import { Store } from '@ngrx/store';

class MockCardsService {
  getCards$(): Observable<Card[]> {
    return of([]);
  }
}

class MockStore {
  select = jasmine.createSpy().and.returnValue(of({}));
  dispatch = jasmine.createSpy();
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, CardListByTagComponent],
      providers: [
        { provide: CardsService, useClass: MockCardsService },
        { provide: Store, useClass: MockStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
