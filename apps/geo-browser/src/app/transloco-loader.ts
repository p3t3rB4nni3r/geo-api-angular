import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { HttpClient } from '@angular/common/http';
import { TranslocoLoaderData } from '@jsverse/transloco/lib/transloco.loader';

@Injectable({ providedIn: 'root' })
export class TransLocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);

  getTranslation(lang: string, data?: TranslocoLoaderData): any {
    const url = `i18n/${lang}.json`;

    return this.http.get<Translation>(url);
  }
}