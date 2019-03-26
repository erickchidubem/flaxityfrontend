import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllLeadsComponent } from './view-all-leads.component';

describe('ViewAllLeadsComponent', () => {
  let component: ViewAllLeadsComponent;
  let fixture: ComponentFixture<ViewAllLeadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllLeadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
