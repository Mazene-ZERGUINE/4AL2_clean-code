import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';

@NgModule({
  declarations: [SideNavBarComponent],
  imports: [CommonModule, SharedModule, RouterModule, HttpClientModule, BrowserAnimationsModule],
  exports: [SideNavBarComponent],
})
export class CoreModule {}
