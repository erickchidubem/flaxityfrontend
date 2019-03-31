import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadSalesComponentComponent } from './lead-sales-component.component';

describe('LeadSalesComponentComponent', () => {
  let component: LeadSalesComponentComponent;
  let fixture: ComponentFixture<LeadSalesComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadSalesComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadSalesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
