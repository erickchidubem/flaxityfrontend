import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadStoryComponent } from './lead-story.component';

describe('LeadStoryComponent', () => {
  let component: LeadStoryComponent;
  let fixture: ComponentFixture<LeadStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
