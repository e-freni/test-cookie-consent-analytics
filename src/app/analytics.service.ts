import { Injectable } from '@angular/core';
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

  constructor(private localStorageService: LocalStorageService) {
  }

  public initializeGoogleAnalytics() {
    console.log('inizializzo google analytics');
    // Asserzione di tipo per 'ga' come qualsiasi funzione
    const ga = (window as any)['ga'];

    if (ga) return; // Se Google Analytics è già stato inizializzato, non fare nulla

    // Carica lo script di Google Analytics
    const script = document.createElement('script');
    script.src = 'https://www.google-analytics.com/analytics.js';
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
        // Inizializza Google Analytics
        (window as any)['ga']('create', 'UA-XXXXX-Y', 'auto'); // Sostituisci 'UA-XXXXX-Y' con il tuo ID di tracciamento
        (window as any)['ga']('set', 'anonymizeIp', true); // Opzionale: anonimizza l'indirizzo IP dell'utente
        (window as any)['ga']('send', 'pageview');
      };

      script.onerror = () => {
        console.error('Script di Google Analytics non caricato');
      };
    }
  }

  public disableGoogleAnalytics() {
    console.log('disabilito google analytics');
    const ga = (window as any)['ga'];
    if (ga) {
      ga('set', 'sendHitTask', null); // disabilita l'invio di dati a GA
    }
  }
}
