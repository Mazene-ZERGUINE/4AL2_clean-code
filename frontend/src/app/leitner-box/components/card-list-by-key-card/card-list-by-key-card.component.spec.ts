import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListByKeyCardComponent } from './card-list-by-key-card.component';

describe('CardListByKeyCardComponent', () => {
  let component: CardListByKeyCardComponent;
  let fixture: ComponentFixture<CardListByKeyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardListByKeyCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardListByKeyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
