import { Injectable } from '@angular/core';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { LocalStorageService } from 'ngx-webstorage';
import { ReplaySubject } from 'rxjs';

export interface AnalyticsEvent {
  type: 'PAGEVIEW' | 'EVENT';
  category?: string;
  action?: string;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private localStorageService: LocalStorageService, private ccService: NgcCookieConsentService) {
  }

  public initializeGoogleTagManager() {
    console.log('Inizializzo Google Tag Manager');
    const gtmId = 'GTM-XXXXXX'; // Sostituisci con il tuo ID container di GTM

    if ((window as any)['google_tag_manager'] && (window as any)['google_tag_manager'][gtmId]) {
      // GTM è già stato caricato, non fare nulla
      return;
    }

    // Carica lo script di Google Tag Manager
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    document.head.appendChild(script);

    const savedPreferences = this.localStorageService.retrieve('cookiePreference');

    if (savedPreferences) {
      //TODO possibile implementazione per oggetto di cookie invece di preferenza singola
      // if (savedPreferences.performance) {
      //   // Inizializza Google Analytics o altri strumenti di performance
      // }
      // if (savedPreferences.advertising) {
      //   // Aggiungi altre condizioni per funzionali e advertising
      // }
      script.onload = () => {
        console.log('Script di Google Tag Manager caricato');
      };

      script.onerror = () => {
        console.error('Script di Google Tag Manager non caricato');
      };
    }
  }

  public disableGoogleTagManager() {

    console.log('Disabilito Google Analytics attraverso GTM');
    (window as any)['dataLayer'] = (window as any)['dataLayer'] || [];
    (window as any)['dataLayer'].push({
      'event': 'cookieConsentUpdate',
      'analyticsConsent': false
    });
  }
}
