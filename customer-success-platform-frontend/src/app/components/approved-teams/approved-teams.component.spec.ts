import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedTeamsComponent } from './approved-teams.component';

describe('ApprovedTeamsComponent', () => {
  let component: ApprovedTeamsComponent;
  let fixture: ComponentFixture<ApprovedTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovedTeamsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovedTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
