import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'category', component: CategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeitnerBoxRoutingModule {}
