import { NavigationService } from './navigation.service';
import { Injectable, signal, inject } from '@angular/core';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private navigationService = inject(NavigationService);

  private users: User[] = this.loadUsersFromLocalStorage();
  private loggedInUser = signal<User | null>(this.loadUserFromLocalStorage());

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.loggedInUser.set(user);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  register(username: string, password: string): boolean {
    const existingUser = this.users.find(u => u.username === username);
    if (existingUser) {
      return false; //  déjà pris
    }

    const newUser: User = { username, password };
    this.users.push(newUser);
    //  mise à jour du localStorage
    this.saveUsersToLocalStorage(); 

    // connecte automatiquement
    this.loggedInUser.set(newUser); 
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));

    return true;
  }

  logout() {
    this.loggedInUser.set(null);
    localStorage.removeItem('loggedInUser');
    this.navigationService.navigateBack();
  }

  isAuthenticated(): boolean {
    return this.loggedInUser() !== null;
  }

  getCurrentUser(): User | null {
    return this.loggedInUser();
  }


  private saveUsersToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  private loadUsersFromLocalStorage(): User[] {
    const usersJson = localStorage.getItem('users');
    return usersJson ? JSON.parse(usersJson) : [{ username: 'admin', password: '1234' }];
  }

  private loadUserFromLocalStorage(): User | null {
    const userJson = localStorage.getItem('loggedInUser');
    return userJson ? JSON.parse(userJson) as User : null;
  }
}