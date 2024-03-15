import { Component, Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';

@Component({
  selector: 'app-risk-profiles',
  templateUrl: './risk-profiles.component.html',
  styleUrl: './risk-profiles.component.css'
})

export class RiskProfilesComponent {
  @Input() projectId!: string;
  apiUrl: string = 'https://localhost:44347/api/app/risk-profile';
  riskProfiles: any[] = [];
  

  constructor(private riskProfileService: CustomerSuccessService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    console.log('Loading scopes');
    this.riskProfileService.getProjects(this.apiUrl).subscribe(
      (data) => {
        console.log('Project Scope:', data.items);
        this.riskProfiles = data.items;
      },
      (error) => {
        console.log('Error fetching projects:', error);
      }
    );
  }

  addItem(projectId: string): void {
    let newItem = {projectId, RiskType: Number, Description: '',Severity: Number, Impact: Number, RemedialSteps: '',Status: '','Closure Date': '', editing: true};
    this.riskProfiles.push(newItem);
    newItem = {projectId, RiskType: Number, Description: '',Severity: Number, Impact: Number, RemedialSteps: '',Status: '','Closure Date': '', editing: true}; // Clear newItem after adding
  }

  editItem(index: number): void {
    this.riskProfiles[index].editing = true;
  }

  saveItem(index: number, id : string): void {
    const project = this.riskProfiles[index];
    if (id) {
    console.log('Updating project with id:', id); 
      this.riskProfileService.updateProject(this.apiUrl, id, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error updating project:', error);
        }
      });
    } else {
      console.log('Adding project'); 
      this.riskProfileService.addProject(this.apiUrl, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error adding project:', error);
        }
      });
    }
    
  }

  deleteItem(index: number,id: string): void {
    console.log('Deleting project with id:', id); 
    const project = this.riskProfiles[index];
    this.riskProfileService.deleteProject(this.apiUrl, id).subscribe(
      () => {
        this.riskProfiles.splice(index, 1); // Remove project from projects array
        console.log('Project deleted:', project);
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting project:', error);
      }
    );
  }
}
