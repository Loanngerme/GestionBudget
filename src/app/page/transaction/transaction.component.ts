import { TransactionsService } from './../../services/transactions.service';
import { Transaction } from './../../models/transaction.model';
import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormTransactionComponent } from '../../components/form-transaction/form-transaction.component';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, style, animate } from '@angular/animations';
import { AfterViewInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AddPayeConfirmationDialogComponent } from '../../components/add-paye-confirmation-dialog/add-paye-confirmation-dialog.component';
import { TranslatePipe } from '@ngx-translate/core'; 
import { PayeService } from '../../services/paye.service';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
  animations: [
    trigger('expandCollapse', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('200ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ height: 0, opacity: 0 }))
      ])
    ])
  ]
})
export class TransactionComponent implements AfterViewInit {

  TransactionsService = inject(TransactionsService);
  transactions = signal<Transaction[]>([]);
  filteredTransactions = signal<Transaction[]>([]);
  categories = signal<string[]>([]);
  selectedCategory = '';
  expandedTransactionId = signal<number | null>(null);
  loadingTransactions = true;
  private dialog2 = inject(MatDialog);
  private router = inject(Router);
  private navigationService = inject(NavigationService);
  private snackBar = inject(MatSnackBar);
  allPaye: string[] = [];
  private readonly dialog = inject(MatDialog);

  gradientStyle = {};

  constructor(private payeService: PayeService) {}

  ngOnInit(): void {
    const transactions = this.TransactionsService.getAll();
    this.transactions.set(transactions);
    this.filteredTransactions.set(transactions);
    this.categories.set([...new Set(transactions.map(t => t.category).filter(Boolean))]);
    this.loadingTransactions = false;
  }

  ngAfterViewInit() {}

  addTransaction() {
    const newTransaction = new Transaction();
    this.TransactionsService.add(newTransaction);
    this.refreshView();
    this.showSuccess('Transaction ajoutée ✅');
  }

  deleteTransaction(id: number) {
    this.TransactionsService.delete(id);
    this.refreshView();
    this.showSuccess('Transaction supprimée ✅');
  }
 showSuccess(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: ['snackbar-success']
    });
  }
  openForm() {
    this.dialog.open(FormTransactionComponent, {
      width: '400px'
    }).afterClosed().subscribe(result => {
      if (result) {
        this.TransactionsService.add(result);
        this.refreshView();
        this.showSuccess('Transaction ajoutée ✅');
      }
    });
  }
   

  toggleDetails(id: number) {
    this.expandedTransactionId.update(current => current === id ? null : id);
  }

  filterTransactions() {
    const all = this.transactions();
    const filtered = this.selectedCategory
      ? all.filter(t => t.category === this.selectedCategory)
      : all;
    this.filteredTransactions.set(filtered);
  }



  private refreshView() {
    const updated = this.TransactionsService.getAll();
    this.transactions.set(updated);
    this.filterTransactions();
    this.categories.set([...new Set(updated.map(t => t.category).filter(Boolean))]);
  }
  get totalPaye() {
    return this.payeService.total;
  }

  get hasPaye() {
    return this.allPaye.length > 0;
  }

  get message() {
    return 'vous avez encore inséré aucune paye.';
  }
  addPaye(paye: string) {
  const dialogRef = this.dialog.open(AddPayeConfirmationDialogComponent);
  dialogRef.afterClosed().subscribe(confirmation => {
    if (confirmation && paye.trim()) {
      this.payeService.addPaye(paye);
      this.showSuccess('Paye ajoutée ✅');
    }
  });
}

}