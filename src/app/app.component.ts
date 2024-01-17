import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  NgcCookieConsentService,
  NgcInitializationErrorEvent, NgcInitializingEvent,
  NgcNoCookieLawEvent,
  NgcStatusChangeEvent
} from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';
import { AnalyticsService } from './analytics.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {


  private popupOpenSubscription!: Subscription;
  private popupCloseSubscription!: Subscription;
  private initializingSubscription!: Subscription;
  private initializedSubscription!: Subscription;
  private initializationErrorSubscription!: Subscription;
  private statusChangeSubscription!: Subscription;
  private revokeChoiceSubscription!: Subscription;
  private noCookieLawSubscription!: Subscription;

  constructor(private ccService: NgcCookieConsentService, private analyticsService: AnalyticsService, private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    const cookieConsent = this.localStorageService.retrieve('cookiePreference');
    console.log('consenso individuato nel localStorage:', cookieConsent);
    // subscribe to cookieconsent observables to react to main events
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.initializingSubscription = this.ccService.initializing$.subscribe(
      (event: NgcInitializingEvent) => {
        // the cookieconsent is initilializing... Not yet safe to call methods like `NgcCookieConsentService.hasAnswered()`
        console.log(`initializing: ${JSON.stringify(event)}`);

      });

    this.initializedSubscription = this.ccService.initialized$.subscribe(
      () => {
        // the cookieconsent has been successfully initialized.
        // It's now safe to use methods on NgcCookieConsentService that require it, like `hasAnswered()` for eg...
        console.log(`initialized: ${JSON.stringify(event)}`);
      });

    this.initializationErrorSubscription = this.ccService.initializationError$.subscribe(
      (event: NgcInitializationErrorEvent) => {
        // the cookieconsent has failed to initialize...
        console.log(`initializationError: ${JSON.stringify(event.error?.message)}`);
      });

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        if (event.status === 'allow') {
          this.analyticsService.initializeGoogleTagManager();
          this.localStorageService.store('cookiePreference', 'allow');
        }
        if (event.status === 'deny') {
          this.analyticsService.disableGoogleTagManager();
          this.localStorageService.store('cookiePreference', 'deny');
        }
      }
    );

    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    if (cookieConsent) {
      console.log('consenso già dato non far apparire il popup');
      this.ccService.fadeOut() //XXX non esiste un sistema dalla libreria per fare lo start del pop-up già minimizzato (il fadeout lo rimuove totalmente)
    }
    if (cookieConsent === 'allow') {
      this.analyticsService.initializeGoogleTagManager();
    }
    if (cookieConsent === 'deny') {
      this.analyticsService.disableGoogleTagManager();
    }
  }

  ngOnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializingSubscription.unsubscribe();
    this.initializedSubscription.unsubscribe();
    this.initializationErrorSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }
}
