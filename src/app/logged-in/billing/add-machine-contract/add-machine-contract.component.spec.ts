import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMachineContractComponent } from './add-machine-contract.component';

describe('AddMachineContractComponent', () => {
  let component: AddMachineContractComponent;
  let fixture: ComponentFixture<AddMachineContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMachineContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMachineContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
