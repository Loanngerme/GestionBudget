import { Injectable } from '@angular/core';
import { Transaction } from './../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private transactions: Transaction[] = [];
  private currentIndex: number = 1;

  constructor() {
    this.load();
  }

  private save() {
    localStorage.setItem('transactions', JSON.stringify(this.transactions)); 
  }

  private load() {
    const transactionData = localStorage.getItem('transactions');
    if (transactionData) {
      this.transactions = JSON.parse(transactionData).map((transactionJSON: any) =>
        Object.assign(new Transaction(), transactionJSON)
      );
      this.currentIndex = Math.max(...this.transactions.map(t => t.id)) + 1;
    } else {
      this.init();
      this.save();
    }
  }

  private init() {
    this.transactions = [];

    const transaction1 = new Transaction();
    transaction1.id = this.currentIndex++;
    transaction1.description = "";
    transaction1.prix = 40;
    transaction1.category = "";
    transaction1.date = '';
    this.transactions.push(transaction1);

    const transaction2 = new Transaction();
    transaction2.id = this.currentIndex++;
    transaction2.description = "description dépense 2";
    transaction2.prix = 20;
    transaction2.category = '';
    transaction2.date = '';
    this.transactions.push(transaction2);
  }

  getAll(): Transaction[] {
    return this.transactions.map(t => t.copy());
  }

  get(id: number): Transaction | undefined {
    const transaction = this.transactions.find(t => t.id === id);
    return transaction ? transaction.copy() : undefined;
  }

  add(transaction: Transaction): Transaction {
    const transactionCopy = transaction.copy();
    transactionCopy.id = this.currentIndex++;
    this.transactions.push(transactionCopy);
    this.save();
    return transactionCopy;
  }

  update(transaction: Transaction): Transaction {
    const transactionCopy = transaction.copy();
    const transactionIndex = this.transactions.findIndex(t => t.id === transaction.id);

    if (transactionIndex !== -1) {
      this.transactions[transactionIndex] = transactionCopy;
      this.save();
    }

    return transactionCopy;
  }

  delete(id: number) {
    const transactionIndex = this.transactions.findIndex(t => t.id === id);
    if (transactionIndex !== -1) {
      this.transactions.splice(transactionIndex, 1);
      this.save();
    }
  }
}