import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListByCategoryComponent } from './card-list-by-category.component';

describe('CardListByCategoryComponent', () => {
  let component: CardListByCategoryComponent;
  let fixture: ComponentFixture<CardListByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardListByCategoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardListByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
