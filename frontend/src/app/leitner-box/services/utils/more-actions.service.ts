import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShowAllCardsDialogComponent } from '../../components/dialog/show-all-cards-dialog/show-all-cards-dialog.component';
import { Card } from 'src/app/core/models/card.model';
import { AddCardDialogComponent } from '../../components/dialog/add-card-dialog/add-card-dialog.component';
import { DIALOG_HEIGHT_WITH } from 'src/app/common/variables/constants';

export type ShowAllCardDialogData = {
  cards: Card[];
};

@Injectable()
export class MoreActionService {
  constructor(private dialog: MatDialog) {}

  openShowAllCardsDialog$(cards: Card[]) {
    const dialogRef = this.dialog.open(ShowAllCardsDialogComponent, {
      ...DIALOG_HEIGHT_WITH,
      data: { cards },
    });

    return dialogRef.afterClosed();
  }

  openAddCardDialog$(tag: string) {
    const dialogRef = this.dialog.open(AddCardDialogComponent, {
      ...DIALOG_HEIGHT_WITH,
      data: { tag },
    });

    return dialogRef.afterClosed();
  }
}
