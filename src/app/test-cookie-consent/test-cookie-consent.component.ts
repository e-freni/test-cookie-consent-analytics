import { Component, OnInit } from '@angular/core';
import { NgcCookieConsentService } from 'ngx-cookieconsent';

@Component({
  selector: 'app-test-cookie-consent',
  templateUrl: './test-cookie-consent.component.html',
  styleUrls: ['./test-cookie-consent.component.css']
})
export class TestCookieConsentComponent {
  //TODO questo componente non è usato per ora, è una prova di modale da aprire per i consensi, ma attualmente è oscurata

  preferences = {
    performance: false,
    functional: false,
    advertising: false
  };

  savePreferences() {
    // Salva le preferenze dell'utente
    // Ad esempio, puoi salvarle in localStorage

    localStorage.setItem('cookiePreferences', JSON.stringify(this.preferences));
    // Qui puoi anche chiamare la logica per abilitare/disabilitare Google Analytics
  }


}
