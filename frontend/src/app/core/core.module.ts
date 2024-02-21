import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [SideNavBarComponent, HomeComponent],
  imports: [CommonModule, SharedModule, RouterModule, MatButtonModule],
  exports: [SideNavBarComponent],
})
export class CoreModule {}
