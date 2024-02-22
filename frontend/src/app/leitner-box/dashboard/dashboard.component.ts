import { Component } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { Observable } from 'rxjs';
import { Card } from 'src/app/core/models/card.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private cardService: CardsService) {}

  readonly cards$: Observable<Card[]> = this.cardService.getCards$().pipe();
}
