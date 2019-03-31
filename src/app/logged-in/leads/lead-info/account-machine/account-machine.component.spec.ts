import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMachineComponent } from './account-machine.component';

describe('AccountMachineComponent', () => {
  let component: AccountMachineComponent;
  let fixture: ComponentFixture<AccountMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
