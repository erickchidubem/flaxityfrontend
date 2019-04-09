import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllServiceCallComponent } from './all-service-call.component';

describe('AllServiceCallComponent', () => {
  let component: AllServiceCallComponent;
  let fixture: ComponentFixture<AllServiceCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllServiceCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllServiceCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
