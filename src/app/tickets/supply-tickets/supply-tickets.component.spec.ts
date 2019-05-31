import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyTicketsComponent } from './supply-tickets.component';

describe('SupplyTicketsComponent', () => {
  let component: SupplyTicketsComponent;
  let fixture: ComponentFixture<SupplyTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
