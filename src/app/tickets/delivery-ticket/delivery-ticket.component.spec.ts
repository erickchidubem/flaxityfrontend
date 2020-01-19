import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryTicketComponent } from './delivery-ticket.component';

describe('DeliveryTicketComponent', () => {
  let component: DeliveryTicketComponent;
  let fixture: ComponentFixture<DeliveryTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
