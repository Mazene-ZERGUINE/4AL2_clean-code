import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Card } from 'src/app/core/models/card.model';

@Component({
  selector: 'app-card-list-by-key-card',
  templateUrl: './card-list-by-key-card.component.html',
  styleUrls: ['./card-list-by-key-card.component.scss'],
})
export class CardListByKeyCardComponent {
  @Input() cardByCardKey: KeyValue<string, Card[]> | undefined;
}
