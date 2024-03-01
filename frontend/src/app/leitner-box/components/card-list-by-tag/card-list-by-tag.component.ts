import { KeyValue } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/common/services/navigation/navigation.service';
import { Card } from 'src/app/core/models/card.model';
import { MoreActionService } from '../../../shared/services/utils/more-actions.service';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

const tagQueryParam = 'tagOpend';

@Component({
  selector: 'app-card-list-by-tag',
  templateUrl: './card-list-by-tag.component.html',
  styleUrls: ['./card-list-by-tag.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateX(-100px)' }),
            stagger(
              '50ms',
              animate('550ms ease-out', style({ opacity: 1, transform: 'translateX(0px)' })),
            ),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListByTagComponent {
  @Input() cards: Card[] | undefined;
  @Input() cardsByTag: KeyValue<string, Card[]> | undefined;

  constructor(
    private moreActionService: MoreActionService,
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
  ) {}

  readonly cardTagParam$: Observable<string | null> =
    this.navigationService.getQueryParamValueFromActivatedRoute$(
      this.activatedRoute,
      tagQueryParam,
    );

  panelOpened(): void {
    if (this.cardsByTag?.key) {
      this.navigationService.addQueriesToCurrentUrl({
        [tagQueryParam]: this.cardsByTag.key,
      });
    }
  }

  handleClickShowAllCards() {
    if (this.cards) {
      this.moreActionService.openShowAllCardsDialog$(
        this.cards.filter(
          (card) => card.tag.toLowerCase() === this.cardsByTag?.key.toLocaleLowerCase(),
        ),
      );
    }
  }

  handleClickAddCard() {
    if (this.cardsByTag) {
      this.moreActionService.openAddCardDialog$(this.cardsByTag?.key);
    }
  }

  handleClickShowQuizzStepper() {
    if (this.cardsByTag) {
      this.moreActionService.openQuizzStepperDialog$(this.cardsByTag?.value);
    }
  }
}
