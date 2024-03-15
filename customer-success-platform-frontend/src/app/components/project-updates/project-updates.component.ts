import { Component, Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';

@Component({
  selector: 'app-project-updates',
  templateUrl: './project-updates.component.html',
  styleUrl: './project-updates.component.css'
})

export class ProjectUpdatesComponent {
  @Input() projectId!: string;
  apiUrl: string = 'https://localhost:44347/api/app/project-updates';
  updates: any[] = [];
  
  constructor(private projectUpdateService: CustomerSuccessService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    console.log('Loading scopes');
    this.projectUpdateService.getProjects(this.apiUrl).subscribe(
      (data) => {
        console.log('Project Scope:', data.items);
        this.updates = data.items;
      },
      (error) => {
        console.log('Error fetching projects:', error);
      }
    );
  }

  addItem(projectId: string): void {
    let newItem = {projectId, 'Update Date': '', 'General Updates': '', editing: true};
    this.updates.push(newItem);
    newItem = {projectId, 'Update Date': '', 'General Updates': '', editing: true}; 
  }

  editItem(index: number): void {
    this.updates[index].editing = true;
  }

  saveItem(index: number, id : string): void {
    const project = this.updates[index];
    if (id) {
    console.log('Updating project with id:', id); 
      this.projectUpdateService.updateProject(this.apiUrl, id, project).subscribe({
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
      this.projectUpdateService.addProject(this.apiUrl, project).subscribe({
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
    const project = this.updates[index];
    this.projectUpdateService.deleteProject(this.apiUrl, id).subscribe(
      () => {
        this.updates.splice(index, 1); // Remove project from projects array
        console.log('Project deleted:', project);
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting project:', error);
      }
    );
  }
}
