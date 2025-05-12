export class Transaction {
   id: number = 0;
   title: string = '';
   description: string = '';
   date: string = '';
   category: string = '';
   icon: string = '';
   prix: number= 0;
 
   constructor(init?: Partial<Transaction>) {
     Object.assign(this, init);
   }
 
   copy(): Transaction {
     return new Transaction({ ...this });
   }
 }