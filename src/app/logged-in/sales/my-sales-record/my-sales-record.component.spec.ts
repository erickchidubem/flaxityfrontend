import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySalesRecordComponent } from './my-sales-record.component';

describe('MySalesRecordComponent', () => {
  let component: MySalesRecordComponent;
  let fixture: ComponentFixture<MySalesRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySalesRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySalesRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
