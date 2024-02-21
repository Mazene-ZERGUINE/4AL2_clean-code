import { Component } from '@angular/core';
import { SideNavMenuType } from '../interface/side-nav-bar.interface';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss'],
})
export class SideNavBarComponent {
  readonly sideNavMenu: SideNavMenuType[] = [
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'leitner-box',
    },
    {
      icon: 'list_icon',
      label: 'List',
      route: 'list',
    },
    {
      icon: 'category',
      label: 'Category',
      route: 'category',
    },
    {
      icon: 'person',
      label: 'Account',
      route: 'account',
    },
    {
      icon: 'notifications',
      label: 'Reminder',
      route: '/reminder',
    },
    {
      icon: 'security',
      label: 'Security',
      route: '/security',
    },
  ];
}
