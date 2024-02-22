import { Component, Input } from '@angular/core';
import { Card } from 'src/app/core/models/card.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent {
  @Input() cards: Card[] | undefined;
}
