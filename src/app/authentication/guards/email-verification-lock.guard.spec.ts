import { TestBed } from '@angular/core/testing';

import { EmailVerificationGuard } from './email-verification-lock.guard';

describe('EmailVerificationLockGuard', () => {
  let guard: EmailVerificationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmailVerificationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
