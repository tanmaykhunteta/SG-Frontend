import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayNewRewardComponent } from './display-new-reward.component';

describe('DisplayNewRewardComponent', () => {
  let component: DisplayNewRewardComponent;
  let fixture: ComponentFixture<DisplayNewRewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayNewRewardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayNewRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
