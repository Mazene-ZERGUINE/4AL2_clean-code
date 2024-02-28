import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addCard } from 'src/app/state/leitner-box/leitner-box.actions';

@Component({
  selector: 'app-add-card-dialog',
  templateUrl: './add-card-dialog.component.html',
  styleUrls: ['./add-card-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCardDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tag: string },
    private store: Store,
  ) {}

  readonly addCardForm = new FormGroup({
    question: new FormControl<string>('', Validators.required),
    answer: new FormControl<string>('', Validators.required),
  });

  onSubmitForm() {
    if (this.addCardForm.invalid) return;
    const newCard = {
      tag: this.data.tag,
      question: this.addCardForm.controls.question.value ?? '',
      answer: this.addCardForm.controls.answer.value ?? '',
    };
    console.log(newCard);
    this.store.dispatch(addCard(newCard));
    this.dialogRef.close();
  }
}
