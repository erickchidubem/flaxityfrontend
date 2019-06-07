import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesQuickFlashComponent } from './sales-quick-flash.component';

describe('SalesQuickFlashComponent', () => {
  let component: SalesQuickFlashComponent;
  let fixture: ComponentFixture<SalesQuickFlashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesQuickFlashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesQuickFlashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
