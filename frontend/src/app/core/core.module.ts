import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SideNavBarComponent],
  imports: [CommonModule, SharedModule],
  exports: [SideNavBarComponent],
})
export class CoreModule {}
