import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeServiceCallComponent } from './make-service-call.component';

describe('MakeServiceCallComponent', () => {
  let component: MakeServiceCallComponent;
  let fixture: ComponentFixture<MakeServiceCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeServiceCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeServiceCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
