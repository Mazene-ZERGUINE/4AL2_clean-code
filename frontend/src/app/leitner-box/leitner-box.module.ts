import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CategoryComponent } from './category/category.component';
import { CardListByKeyCardComponent } from './components/card-list-by-key-card/card-list-by-key-card.component';
import { CardListByTagComponent } from './components/card-list-by-tag/card-list-by-tag.component';
import { CardListItemComponent } from './components/card-list-item/card-list-item.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeitnerBoxRoutingModule } from './leitner-box-routing.module';
import { CardsService } from './services/cards.service';
import { CardListByCategoryComponent } from './components/card-list-by-category/card-list-by-category.component';

@NgModule({
  declarations: [
    CardListComponent,
    DashboardComponent,
    CardListItemComponent,
    CategoryComponent,
    CardListByTagComponent,
    CardListByKeyCardComponent,
    CardListByCategoryComponent,
  ],
  imports: [CommonModule, SharedModule, LeitnerBoxRoutingModule],
  providers: [CardsService],
})
export class LeitnerBoxModule {}
