import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavBarComponent } from './side-nav-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

describe('SideNavBarComponent', () => {
  let component: SideNavBarComponent;
  let fixture: ComponentFixture<SideNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideNavBarComponent],
      imports: [
        NoopAnimationsModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        RouterModule.forRoot([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SideNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
