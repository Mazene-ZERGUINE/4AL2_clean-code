import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryComponent } from './category.component';
import { CardListByCategoryComponent } from '../components/card-list-by-category/card-list-by-category.component';
import { CardsService } from '../services/cards.service';
import { Observable, of } from 'rxjs';
import { Card } from '../../core/models/card.model';

class MockCardsService {
  getCards$(): Observable<Card[]> {
    return of([]);
  }
}

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryComponent, CardListByCategoryComponent],
      providers: [{ provide: CardsService, useClass: MockCardsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
