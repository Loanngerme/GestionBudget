import { BehaviorSubject } from 'rxjs';
import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PayeService {
    private readonly STORAGE_KEY = 'allPaye';

  private _allPaye = signal<string[]>(this.loadFromLocalStorage());

  // Ajouter une paye
  addPaye(paye: string) {
    this._allPaye.update(current => {
      const updated = [...current, paye];
      this.saveToLocalStorage(updated);
      return updated;
    });
  }

  // Lire la liste
  get allPaye() {
    return this._allPaye.asReadonly();
  }

  // Total calculé
  get total() {
    return this._allPaye().map(p => Number(p)).filter(n => !isNaN(n)).reduce((acc, val) => acc + val, 0);
  }

  // Total réactif
  readonly totalSignal = computed(() =>
    this._allPaye().map(p => Number(p)).filter(n => !isNaN(n)).reduce((acc, val) => acc + val, 0)
  );

  // Enregistre dans le localStorage
  private saveToLocalStorage(payeList: string[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(payeList));
  }

  // Charge depuis le localStorage
  private loadFromLocalStorage(): string[] {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  }
}