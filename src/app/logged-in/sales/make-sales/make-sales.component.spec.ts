import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeSalesComponent } from './make-sales.component';

describe('MakeSalesComponent', () => {
  let component: MakeSalesComponent;
  let fixture: ComponentFixture<MakeSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
