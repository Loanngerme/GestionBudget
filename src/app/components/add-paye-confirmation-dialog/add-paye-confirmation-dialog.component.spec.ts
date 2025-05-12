import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayeConfirmationDialogComponent } from './add-paye-confirmation-dialog.component';

describe('AddPayeConfirmationDialogComponent', () => {
  let component: AddPayeConfirmationDialogComponent;
  let fixture: ComponentFixture<AddPayeConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPayeConfirmationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPayeConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
