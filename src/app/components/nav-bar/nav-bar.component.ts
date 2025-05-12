import { ThemeService, Theme } from './../../services/theme.service';
import { Component, inject, ViewChild } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/user.service';
import { MatIcon } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuTrigger } from '@angular/material/menu';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Component({
  selector: 'app-nav-bar',
  imports: [MatToolbarModule,MatSelectModule, RouterOutlet, RouterLink, RouterLinkActive, MatIcon, MatRippleModule, MatButtonModule, MatMenuModule, TranslateModule, FormsModule, CommonModule, MatSelect],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  authService = inject(AuthService);
  showMenu = false;
  private hideTimeout: any;
  timeoutId: any;
  readonly themeService = inject(ThemeService)
  theme = this.themeService.currentTheme;

   
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;
  selectedLang = 'fr';

  constructor(private translate: TranslateService) {
    const saved = localStorage.getItem('lang');
    this.selectedLang = saved ?? 'fr';
    this.translate.use(this.selectedLang);
  }

  changeLanguage(event: any) {
    const lang = event.value;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
  openMenu() {
    this.menuTrigger.openMenu();
  }

  closeMenu() {
    this.menuTrigger.closeMenu();
  }
  logout() {
    this.authService.logout();
  } 
  
} 