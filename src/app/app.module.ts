import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgcCookieConsentConfig, NgcCookieConsentModule } from 'ngx-cookieconsent';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestCookieConsentComponent } from './test-cookie-consent/test-cookie-consent.component';

const cookieConfig: NgcCookieConsentConfig = {
  "cookie": {
    "domain": "test.cookieconsent.com"
  },
  "position": "bottom",
  "theme": "classic",
  "palette": {
    "popup": {
      "background": "#000000",
      "text": "#ffffff"
    },
    "button": {
      "background": "#f1d600",
      "text": "#000000"
    }
  },
  "type": "info",
  "content": {
    "message": "This website uses cookies to ensure you get the best experience on our website.",
    "dismiss": "Got it!",
    "deny": "Refuse cookies",
    "link": "Learn more",
    "href": "https://cookiesandyou.com",
    "policy": "Cookie Policy"
  }
}


@NgModule({
  declarations: [
    AppComponent,
    TestCookieConsentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
