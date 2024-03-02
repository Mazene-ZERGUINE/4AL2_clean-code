import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { map, startWith } from 'rxjs';
import { CardPayload } from 'src/app/leitner-box/services/cards.service';
import { MoreActionService } from 'src/app/shared/services/utils/more-actions.service';
import { addCard } from 'src/app/state/leitner-box/leitner-box.actions';

export enum CustomMatSnackBarPosition {
  Center = 'center',
  Top = 'top',
}

@Component({
  selector: 'app-add-card-dialog',
  templateUrl: './add-card-dialog.component.html',
  styleUrls: ['./add-card-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCardDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: { tag: string | null; tags: string[] | null },
    private snackBar: MatSnackBar,
    private moreActionService: MoreActionService,
    private store: Store,
  ) {}

  readonly tagFromList = this.dialogData.tag;

  readonly availableTags = this.dialogData.tags;

  readonly horizontalPosition: MatSnackBarHorizontalPosition = CustomMatSnackBarPosition.Center;

  readonly verticalPosition: MatSnackBarVerticalPosition = CustomMatSnackBarPosition.Top;

  readonly addCardForm = new FormGroup({
    question: new FormControl<string | null>('', Validators.required),
    answer: new FormControl<string | null>('', Validators.required),
    tag: new FormControl<string | null>(
      { value: this.tagFromList, disabled: !!this.tagFromList },
      Validators.required,
    ),
  });

  readonly filtredTags$ = this.addCardForm.controls.tag.valueChanges.pipe(
    startWith(''),
    map((tag) => this._filter(tag || '')),
  );

  onSubmitForm() {
    if (this.addCardForm.invalid) return;

    const { question, answer, tag: formTag } = this.addCardForm.value;

    const effectiveTag = this.tagFromList ?? formTag;

    const isAddCardFormValid = question && answer && effectiveTag;

    if (isAddCardFormValid) {
      const newCard: CardPayload = { question, answer, tag: effectiveTag };
      this.store.dispatch(addCard({ newCard }));
      this._showSnackBar(effectiveTag);
    }

    if (!this.tagFromList) {
      this.addCardForm.controls.tag.disable();
    }
    this.addCardForm.controls.question.reset();
    this.addCardForm.controls.answer.reset();
  }

  private _showSnackBar(tag: string) {
    this.snackBar.open(`You added new card on ${tag} tag`, 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

  private _filter(value: string): string[] | undefined {
    const filterValue = value.toLowerCase();
    return this.availableTags?.filter((tag) => tag.toLowerCase().includes(filterValue));
  }
}
