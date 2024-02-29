import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Card } from 'src/app/core/models/card.model';
import { CardCategory } from 'src/app/core/models/types/category.enum';

export enum CustomStepperOrientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

@Component({
  selector: 'app-quizz-stepper-dialog',
  templateUrl: './quizz-stepper-dialog.component.html',
  styleUrls: ['./quizz-stepper-dialog.component.scss'],
})
export class QuizzStepperDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<QuizzStepperDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: { cards: Card[] },
    private breakpointObserver: BreakpointObserver,
  ) {}

  private validationMessageSource = new BehaviorSubject<string>('');
  validationMessage$ = this.validationMessageSource.asObservable();

  readonly answerFormGroup = new FormGroup({
    answer: new FormControl<string | null>(null, Validators.required),
  });

  readonly cardsToStudy = this.dialogData.cards.filter(
    (card) => card.category === CardCategory.FIRST,
  );

  readonly stepperOrientation$: Observable<StepperOrientation> = this.breakpointObserver
    .observe([Breakpoints.Medium])
    .pipe(
      map((breakpoint) =>
        breakpoint.matches
          ? CustomStepperOrientation.Horizontal
          : CustomStepperOrientation.Vertical,
      ),
    );

  handleIsCorrectAnswer(cardAnswer: string) {
    const userAnswer = this.answerFormGroup.get('answer')?.value;
    if (userAnswer === cardAnswer) {
      this.validationMessageSource.next('Bonne réponse!');
    } else {
      this.validationMessageSource.next(`Mauvaise réponse! La bonne réponse était : ${cardAnswer}`);
    }
  }

  clearPreviousAnswer() {
    this.validationMessageSource.next('');
  }
}
