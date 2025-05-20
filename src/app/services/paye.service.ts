import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayeService {
  private payes = new BehaviorSubject<string[]>([]);
  payes$ = this.payes.asObservable();

  get currentPayes(): string[] {
    return this.payes.value;
  }

  addPaye(paye: string) {
    const current = [...this.payes.value, paye.trim()];
    this.payes.next(current);
  }

  get total(): number {
    return this.currentPayes
      .map(p => Number(p))
      .filter(n => !isNaN(n))
      .reduce((acc, val) => acc + val, 0);
  }
}