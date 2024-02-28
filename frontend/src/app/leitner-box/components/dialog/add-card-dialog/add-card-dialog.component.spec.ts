import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardDialogComponent } from './add-card-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

class MockStore {
  select = jasmine.createSpy().and.returnValue(of({}));
  dispatch = jasmine.createSpy();
}

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
      imports: [
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
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
