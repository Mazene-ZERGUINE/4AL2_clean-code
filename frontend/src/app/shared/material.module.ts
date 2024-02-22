import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
@NgModule({
  exports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatExpansionModule,
    MatDividerModule,
    MatGridListModule,
  ],
})
export class MaterialModule {}
