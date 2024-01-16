import { Component, OnInit } from '@angular/core';
import { NgcCookieConsentService } from 'ngx-cookieconsent';

@Component({
  selector: 'app-test-cookie-consent',
  templateUrl: './test-cookie-consent.component.html',
  styleUrls: ['./test-cookie-consent.component.css']
})
export class TestCookieConsentComponent  {

  constructor(private cookieConsentService: NgcCookieConsentService) {
  }



}
