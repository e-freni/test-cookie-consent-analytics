import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCookieConsentComponent } from './test-cookie-consent.component';

describe('TestCookieConsentComponent', () => {
  let component: TestCookieConsentComponent;
  let fixture: ComponentFixture<TestCookieConsentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestCookieConsentComponent]
    });
    fixture = TestBed.createComponent(TestCookieConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
