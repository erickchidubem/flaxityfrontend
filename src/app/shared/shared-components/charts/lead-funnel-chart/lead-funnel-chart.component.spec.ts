import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadFunnelChartComponent } from './lead-funnel-chart.component';

describe('LeadFunnelChartComponent', () => {
  let component: LeadFunnelChartComponent;
  let fixture: ComponentFixture<LeadFunnelChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadFunnelChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadFunnelChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
