import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerificationLockComponent } from './email-verification-lock.component';

describe('EmailVerificationLockComponent', () => {
  let component: EmailVerificationLockComponent;
  let fixture: ComponentFixture<EmailVerificationLockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailVerificationLockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailVerificationLockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
