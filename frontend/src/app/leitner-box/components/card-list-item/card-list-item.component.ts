import { Component, Input } from '@angular/core';
import { Card } from 'src/app/core/models/card.model';

@Component({
  selector: 'app-card-list-item',
  templateUrl: './card-list-item.component.html',
  styleUrls: ['./card-list-item.component.scss'],
})
export class CardListItemComponent {
  @Input() card: Card | undefined;
}
