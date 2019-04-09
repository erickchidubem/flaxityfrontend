import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadContactComponent } from './lead-contact.component';

describe('LeadContactComponent', () => {
  let component: LeadContactComponent;
  let fixture: ComponentFixture<LeadContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
