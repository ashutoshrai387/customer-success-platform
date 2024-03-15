import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasesMilestonesComponent } from './phases-milestones.component';

describe('PhasesMilestonesComponent', () => {
  let component: PhasesMilestonesComponent;
  let fixture: ComponentFixture<PhasesMilestonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhasesMilestonesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhasesMilestonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
