import { AfterViewInit, Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import {TranslatePipe, TranslateDirective} from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notfound',
  imports: [CommonModule, TranslatePipe, TranslateDirective,],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss'
})
export class NotfoundComponent {

  gradientStyle = {};

  private themeService = inject(ThemeService);
  private translate = inject(TranslateService);
  theme = this.themeService.currentTheme;


  onMouseMove(event: MouseEvent) {
    const x = event.offsetX;
    const y = event.offsetY;

    const gradient = this.isDarkMode
      ? `radial-gradient(circle at ${x}px ${y}px, #1e1e2f, #8e2de2)`
      : `radial-gradient(circle at ${x}px ${y}px, #f5f5f5, #e6e6fa)`;
    this.gradientStyle = {
      background: gradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    };
  }
  get isDarkMode(): boolean {
    return this.themeService.getThemefromLocalStorage() === 'dark';
  }
}
