import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzStepperDialogComponent } from './quizz-stepper-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/shared/material.module';
import { CardCategory } from 'src/app/core/models/types/category.enum';
import { CardListItemComponent } from '../../card-list-item/card-list-item.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

class MockStore {
  select = jasmine.createSpy().and.returnValue(of({}));
  dispatch = jasmine.createSpy();
}

const mockDialogRef = {
  close: jasmine.createSpy('close'),
};

const mockDialogData = {
  cards: [{ id: '1', question: 'What is ...?', answer: '...', category: CardCategory.FIRST }],
};

describe('QuizzStepperDialogComponent', () => {
  let component: QuizzStepperDialogComponent;
  let fixture: ComponentFixture<QuizzStepperDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizzStepperDialogComponent, CardListItemComponent],
      imports: [NoopAnimationsModule, MaterialModule, FormsModule, ReactiveFormsModule],
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizzStepperDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
