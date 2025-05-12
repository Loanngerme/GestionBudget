import { Component, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from '../../services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import {TranslatePipe, TranslateDirective} from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule, TranslatePipe, TranslateDirective, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
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

  ngAfterViewInit(): void {
    const tl = gsap.timeline({
      scrollTrigger: {
        scrub: 1,
        pin: true,
        trigger: "#pin-windmill",
        start: "45% 53%",
        endTrigger: "#pin-windmill-wrap",
        end: "bottom -20%",
      },
    });

    tl.to("#pin-windmill-svg", {
      rotateZ: 900,
    });
  }

  get isDarkMode(): boolean {
    return this.themeService.getThemefromLocalStorage() === 'dark';
  }
}