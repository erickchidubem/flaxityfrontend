import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBillingComponent } from './all-billing.component';

describe('AllBillingComponent', () => {
  let component: AllBillingComponent;
  let fixture: ComponentFixture<AllBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
