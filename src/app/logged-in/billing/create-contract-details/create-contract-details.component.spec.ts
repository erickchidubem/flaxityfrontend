import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContractDetailsComponent } from './create-contract-details.component';

describe('CreateContractDetailsComponent', () => {
  let component: CreateContractDetailsComponent;
  let fixture: ComponentFixture<CreateContractDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateContractDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContractDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
