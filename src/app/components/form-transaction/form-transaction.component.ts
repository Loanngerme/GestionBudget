import { Transaction } from './../../models/transaction.model';
import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-form-transaction',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './form-transaction.component.html',
  styleUrl: './form-transaction.component.scss'
})
export class FormTransactionComponent {

  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private fb = inject(FormBuilder);
  private transactionService = inject(TransactionsService);
  private dialogRef = inject(MatDialogRef<FormTransactionComponent>); // Référence pour fermer le dialog

   form: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    prix: [0, [Validators.required]],
    category: ['', [Validators.required]],
    date: ['', [Validators.required]]
  });

  submit() {
    if (this.form.valid) {
      const newTransaction = new Transaction(this.form.value);
      this.dialogRef.close(newTransaction);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
  
  navigateBack() {
    this.router.navigate(['/transaction']);
  }
  isFieldValid(name: string) {
    const formControl = this.form.get(name);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }
}