import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueRegistrationComponent } from './continue-registration.component';

describe('ContinueRegistrationComponent', () => {
  let component: ContinueRegistrationComponent;
  let fixture: ComponentFixture<ContinueRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinueRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinueRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
