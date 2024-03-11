import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStackComponent } from './project-stack.component';

describe('ProjectStackComponent', () => {
  let component: ProjectStackComponent;
  let fixture: ComponentFixture<ProjectStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectStackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
