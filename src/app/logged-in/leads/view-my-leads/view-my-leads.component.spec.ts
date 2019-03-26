import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyLeadsComponent } from './view-my-leads.component';

describe('ViewMyLeadsComponent', () => {
  let component: ViewMyLeadsComponent;
  let fixture: ComponentFixture<ViewMyLeadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMyLeadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
