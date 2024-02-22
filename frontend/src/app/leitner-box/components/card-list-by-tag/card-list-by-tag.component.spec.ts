import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListByTagComponent } from './card-list-by-tag.component';

describe('CardListByTagComponent', () => {
  let component: CardListByTagComponent;
  let fixture: ComponentFixture<CardListByTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardListByTagComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardListByTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
