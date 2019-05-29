import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllContractInfoComponent } from './all-contract-info.component';

describe('AllContractInfoComponent', () => {
  let component: AllContractInfoComponent;
  let fixture: ComponentFixture<AllContractInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllContractInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllContractInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
