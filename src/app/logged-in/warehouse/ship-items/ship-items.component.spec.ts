import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipItemsComponent } from './ship-items.component';

describe('ShipItemsComponent', () => {
  let component: ShipItemsComponent;
  let fixture: ComponentFixture<ShipItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
