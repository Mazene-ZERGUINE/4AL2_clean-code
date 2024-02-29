import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Card } from 'src/app/core/models/card.model';

export enum TableShowAllCardColumns {
  Category = 'category',
  Question = 'question',
  Answer = 'answer',
  Tag = 'tag',
}

@Component({
  selector: 'app-show-all-cards-dialog',
  templateUrl: './show-all-cards-dialog.component.html',
  styleUrls: ['./show-all-cards-dialog.component.scss'],
})
export class ShowAllCardsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ShowAllCardsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cards: Card[] },
  ) {}

  readonly TableShowAllCardColumns = TableShowAllCardColumns;

  readonly displayedColumns: TableShowAllCardColumns[] = [
    TableShowAllCardColumns.Category,
    TableShowAllCardColumns.Question,
    TableShowAllCardColumns.Answer,
  ];
}
