import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTrendLineChartComponent } from './sales-trend-line-chart.component';

describe('SalesTrendLineChartComponent', () => {
  let component: SalesTrendLineChartComponent;
  let fixture: ComponentFixture<SalesTrendLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesTrendLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesTrendLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
