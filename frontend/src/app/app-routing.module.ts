import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'leitner-box',
    loadChildren: () => import('./leitner-box/leitner-box.module').then((m) => m.LeitnerBoxModule),
  },
  { path: '**', redirectTo: 'leitner-box' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
