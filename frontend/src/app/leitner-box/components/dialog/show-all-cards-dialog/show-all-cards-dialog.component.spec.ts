import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllCardsDialogComponent } from './show-all-cards-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ShowAllCardsDialogComponent', () => {
  let component: ShowAllCardsDialogComponent;
  let fixture: ComponentFixture<ShowAllCardsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowAllCardsDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowAllCardsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
