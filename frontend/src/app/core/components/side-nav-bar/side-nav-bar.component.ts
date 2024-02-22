import { Component } from '@angular/core';
import { SideNavMenuType } from '../../models/types/side-nav-menu.type';

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
      route: 'leitner-box/dashboard',
    },
    {
      icon: 'category',
      label: 'Category',
      route: 'leitner-box/category',
    },
    {
      icon: 'person',
      label: 'Account',
      route: 'leitner-box/account',
    },
    {
      icon: 'notifications',
      label: 'Reminder',
      route: 'leitner-box/reminder',
    },
    {
      icon: 'security',
      label: 'Security',
      route: 'leitner-box/security',
    },
  ];
}
