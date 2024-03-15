import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetTimelineReferenceComponent } from './det-timeline-reference.component';

describe('DetTimelineReferenceComponent', () => {
  let component: DetTimelineReferenceComponent;
  let fixture: ComponentFixture<DetTimelineReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetTimelineReferenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetTimelineReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
