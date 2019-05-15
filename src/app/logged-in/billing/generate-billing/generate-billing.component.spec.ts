import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateBillingComponent } from './generate-billing.component';

describe('GenerateBillingComponent', () => {
  let component: GenerateBillingComponent;
  let fixture: ComponentFixture<GenerateBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
