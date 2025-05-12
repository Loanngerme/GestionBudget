import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { trigger, transition, style, animate, query, group } from '@angular/animations';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {TranslateService, TranslatePipe, TranslateDirective} from "@ngx-translate/core";
import { FormsModule } from '@angular/forms';
import { ThemeService } from './services/theme.service';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent,
    FormsModule,
    HttpClientModule,
    MatSelectModule, 
    MatInputModule,
    MatFormFieldModule,
    TranslatePipe, TranslateDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter, :leave', [
          style({ position: 'absolute', width: '100%', opacity: 0, transform: 'scale(0.95)' })
        ], { optional: true }),
        group([
          query(':leave', [
            animate('300ms ease', style({ opacity: 0, transform: 'scale(1.05)' }))
          ], { optional: true }),
          query(':enter', [
            style({ opacity: 0, transform: 'scale(0.95)' }),
            animate('300ms ease', style({ opacity: 1, transform: 'scale(1)' }))
          ], { optional: true }),
        ])
      ])
    ])
  ]
})
export class AppComponent {

  selectLang:string='';
  TransLang: string[] = [];
  private readonly themeService = inject(ThemeService);

  
  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('lang') || 'fr';
    this.translate.setDefaultLang('fr');
    this.translate.use(savedLang);
  }
  ngOnInit() {
    this.selectLang = this.translate.currentLang || 'fr';
    this.getTransLanguage();
  }
  public selectLanguage(event: any) {
    const lang = event.value;
    this.translate.use(lang);
    localStorage.setItem('lang', lang); // on sauvegarde
  }

setTransLanguage(){
  this.translate.use(this.selectLang);
  }
  getTransLanguage(){
  this.TransLang=[...this.translate.getLangs()];
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

}