import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

export type Theme = 'dark' | 'light'

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

private readonly document = inject(DOCUMENT);
readonly currentTheme = signal<Theme>('light');

  constructor() { 
   this.setTheme(this.getThemefromLocalStorage())
  }

  toggleTheme() {
    if (this.currentTheme() === 'light') {
      this.setTheme('dark')
    }else{
      this.setTheme('light')
    }
  }


  setTheme(theme: Theme) {
    this.currentTheme.set(theme);
    if (theme === 'dark') {
      this.document.documentElement.classList.add('dark-mode')
    }else{
      this.document.documentElement.classList.remove('dark-mode')
    }
    this.setThemeInLocalStorage(theme)
  }

  setThemeInLocalStorage(theme: Theme) {
    localStorage.setItem('preferred-theme', theme)
  }

  getThemefromLocalStorage() {
    return localStorage.getItem('preferred-theme') as Theme 
  }

}
  