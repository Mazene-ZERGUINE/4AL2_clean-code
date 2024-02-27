import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllCardsDialogComponent } from './show-all-cards-dialog.component';

describe('ShowAllCardsDialogComponent', () => {
  let component: ShowAllCardsDialogComponent;
  let fixture: ComponentFixture<ShowAllCardsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowAllCardsDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowAllCardsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
