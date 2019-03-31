import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadSalesComponent } from './lead-sales.component';

describe('LeadSalesComponent', () => {
  let component: LeadSalesComponent;
  let fixture: ComponentFixture<LeadSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
