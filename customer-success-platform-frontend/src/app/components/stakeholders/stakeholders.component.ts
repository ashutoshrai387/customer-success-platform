import { Component, Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';

@Component({
  selector: 'app-stakeholders',
  templateUrl: './stakeholders.component.html',
  styleUrl: './stakeholders.component.css'
})
export class StakeholdersComponent {
  @Input() projectId!: string;
  apiUrl: string = 'https://localhost:44347/api/app/stakeholder';
  stakeholders: any[] = [];
  

  constructor(private stakeholderService: CustomerSuccessService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    console.log('Loading scopes');
    this.stakeholderService.getProjects(this.apiUrl).subscribe(
      (data) => {
        console.log('Project Scope:', data.items);
        this.stakeholders = data.items;
      },
      (error) => {
        console.log('Error fetching projects:', error);
      }
    );
  }

  addItem(projectId: string): void {
    let newItem = {projectId, Title: '', Name: '',Contact: '',Email: '', editing: true};
    this.stakeholders.push(newItem);
    newItem = {projectId, Title: '', Name: '',Contact: '',Email: '', editing: true}; 
  }

  editItem(index: number): void {
    this.stakeholders[index].editing = true;
  }

  saveItem(index: number, id : string): void {
    const project = this.stakeholders[index];
    if (id) {
    console.log('Updating project with id:', id); 
      this.stakeholderService.updateProject(this.apiUrl, id, project).subscribe({
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
      this.stakeholderService.addProject(this.apiUrl, project).subscribe({
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
    const project = this.stakeholders[index];
    this.stakeholderService.deleteProject(this.apiUrl, id).subscribe(
      () => {
        this.stakeholders.splice(index, 1); // Remove project from projects array
        console.log('Project deleted:', project);
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting project:', error);
      }
    );
  }
}
