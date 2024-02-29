import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzStepperDialogComponent } from './quizz-stepper-dialog.component';

describe('QuizzStepperDialogComponent', () => {
  let component: QuizzStepperDialogComponent;
  let fixture: ComponentFixture<QuizzStepperDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizzStepperDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizzStepperDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
