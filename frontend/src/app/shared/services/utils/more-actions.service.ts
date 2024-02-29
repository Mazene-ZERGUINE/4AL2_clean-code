import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Card } from 'src/app/core/models/card.model';
import { AddCardDialogComponent } from '../../../leitner-box/components/dialog/add-card-dialog/add-card-dialog.component';
import { DIALOG_HEIGHT_WITH } from 'src/app/common/variables/constants';
import { QuizzStepperDialogComponent } from 'src/app/leitner-box/components/dialog/quizz-stepper-dialog/quizz-stepper-dialog.component';
import { ShowAllCardsDialogComponent } from 'src/app/leitner-box/components/dialog/show-all-cards-dialog/show-all-cards-dialog.component';

@Injectable()
export class MoreActionService {
  constructor(private dialog: MatDialog) {}

  openShowAllCardsDialog$(cards: Card[]) {
    this.dialog.open(ShowAllCardsDialogComponent, {
      ...DIALOG_HEIGHT_WITH,
      data: { cards },
    });
  }

  openAddCardDialog$(tag?: string | null, tags?: string[] | null) {
    this.dialog.open(AddCardDialogComponent, {
      ...DIALOG_HEIGHT_WITH,
      data: { tag, tags },
    });
  }

  openQuizzStepperDialog$(cards: Card[]) {
    this.dialog.open(QuizzStepperDialogComponent, {
      data: { cards },
    });
  }

  closeOpenedDialog(
    dialog: MatDialogRef<
      AddCardDialogComponent | QuizzStepperDialogComponent | ShowAllCardsDialogComponent
    >,
  ) {
    dialog.close();
  }
}
