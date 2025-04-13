import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { MatTooltipModule } from '@angular/material/tooltip';
import { APP_VERSION } from './app.config';

@Component({
  selector: 'app-root',
  imports: [
    MatToolbar,
    RouterOutlet,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule,
    TranslocoDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'geo-browser';
  private readonly _transLocoService: TranslocoService =
    inject(TranslocoService);
  version = inject(APP_VERSION);
  selectLang(lang: string) {
    this._transLocoService.setActiveLang(lang);
  }
}
