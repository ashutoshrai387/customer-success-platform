import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskProfilesComponent } from './risk-profiles.component';

describe('RiskProfilesComponent', () => {
  let component: RiskProfilesComponent;
  let fixture: ComponentFixture<RiskProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RiskProfilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RiskProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
