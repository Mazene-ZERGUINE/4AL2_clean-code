import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CategoryComponent } from './category/category.component';
import { AddCardDialogComponent } from './components/dialog/add-card-dialog/add-card-dialog.component';
import { CardListByTagComponent } from './components/card-list-by-tag/card-list-by-tag.component';
import { CardListItemComponent } from './components/card-list-item/card-list-item.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { ShowAllCardsDialogComponent } from './components/dialog/show-all-cards-dialog/show-all-cards-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeitnerBoxRoutingModule } from './leitner-box-routing.module';
import { CardsService } from './services/cards.service';
import { MoreActionService } from './services/utils/more-actions.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SharedModule, LeitnerBoxRoutingModule],
  declarations: [
    CardListComponent,
    DashboardComponent,
    CardListItemComponent,
    CategoryComponent,
    CardListByTagComponent,
    ShowAllCardsDialogComponent,
    AddCardDialogComponent,
  ],
  providers: [CardsService, MoreActionService],
})
export class LeitnerBoxModule {}
