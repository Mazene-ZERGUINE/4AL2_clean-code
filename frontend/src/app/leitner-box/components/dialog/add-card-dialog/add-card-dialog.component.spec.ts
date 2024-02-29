import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardDialogComponent } from './add-card-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MoreActionService } from 'src/app/shared/services/utils/more-actions.service';
import { MaterialModule } from 'src/app/shared/material.module';

class MockStore {
  select = jasmine.createSpy().and.returnValue(of({}));
  dispatch = jasmine.createSpy();
}

class MockMoreActionService {}

const mockDialogRef = {
  close: jasmine.createSpy('close'),
};

const mockDialogData = {};

describe('AddCardDialogComponent', () => {
  let component: AddCardDialogComponent;
  let fixture: ComponentFixture<AddCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCardDialogComponent],
      imports: [NoopAnimationsModule, MaterialModule, FormsModule, ReactiveFormsModule],
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MoreActionService, useClass: MockMoreActionService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
