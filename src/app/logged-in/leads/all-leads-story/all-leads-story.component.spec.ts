import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLeadsStoryComponent } from './all-leads-story.component';

describe('AllLeadsStoryComponent', () => {
  let component: AllLeadsStoryComponent;
  let fixture: ComponentFixture<AllLeadsStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllLeadsStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLeadsStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
