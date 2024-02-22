import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SideNavBarComponent],
  imports: [CommonModule, SharedModule, RouterModule, HttpClientModule],
  exports: [SideNavBarComponent],
})
export class CoreModule {}
