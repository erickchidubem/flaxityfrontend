import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewServiceCallComponent } from './view-service-call.component';

describe('ViewServiceCallComponent', () => {
  let component: ViewServiceCallComponent;
  let fixture: ComponentFixture<ViewServiceCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewServiceCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewServiceCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
