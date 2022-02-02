import { TestBed } from '@angular/core/testing';

import { SignInPageGuard } from './sign-in-page.guard';

describe('SignInPageGuard', () => {
  let guard: SignInPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SignInPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
