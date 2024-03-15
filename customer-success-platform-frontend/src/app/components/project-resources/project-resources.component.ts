import { Component, Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';

@Component({
  selector: 'app-project-resources',
  templateUrl: './project-resources.component.html',
  styleUrl: './project-resources.component.css'
})
export class ProjectResourcesComponent {
  @Input() projectId!: string;
  apiUrl: string = 'https://localhost:44347/api/app/project-resources';
  resources: any[] = [];
  

  constructor(private resourceService: CustomerSuccessService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    console.log('Loading scopes');
    this.resourceService.getProjects(this.apiUrl).subscribe(
      (data) => {
        console.log('Project Scope:', data.items);
        this.resources = data.items;
      },
      (error) => {
        console.log('Error fetching projects:', error);
      }
    );
  }

  addItem(projectId: string): void {
    let newItem = {projectId, 'Resource Name': '', Role: '', 'Start Date': '', 'End Date': '',Comment: '', editing: true};
    this.resources.push(newItem);
    newItem = {projectId, 'Resource Name': '', Role: '', 'Start Date': '', 'End Date': '',Comment: '', editing: true}; // Clear newItem after adding
  }

  editItem(index: number): void {
    this.resources[index].editing = true;
  }

  saveItem(index: number, id : string): void {
    const project = this.resources[index];
    if (id) {
    console.log('Updating project with id:', id); 
      this.resourceService.updateProject(this.apiUrl, id, project).subscribe({
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
      this.resourceService.addProject(this.apiUrl, project).subscribe({
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
    const project = this.resources[index];
    this.resourceService.deleteProject(this.apiUrl, id).subscribe(
      () => {
        this.resources.splice(index, 1); // Remove project from projects array
        console.log('Project deleted:', project);
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting project:', error);
      }
    );
  }
}
