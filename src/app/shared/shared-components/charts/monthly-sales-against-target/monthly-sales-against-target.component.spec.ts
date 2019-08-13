import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlySalesAgainstTargetComponent } from './monthly-sales-against-target.component';

describe('MonthlySalesAgainstTargetComponent', () => {
  let component: MonthlySalesAgainstTargetComponent;
  let fixture: ComponentFixture<MonthlySalesAgainstTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlySalesAgainstTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlySalesAgainstTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
