import { Component,Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';

@Component({
  selector: 'app-scope',
  templateUrl: './scope.component.html',
  styleUrl: './scope.component.css'
})
export class ScopeComponent {
  @Input() projectId!: string;
  apiUrl: string = 'https://localhost:44347/api/app/scope';
  scopes: any[] = [];
  
  constructor(private scopeService: CustomerSuccessService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    console.log('Loading scopes');
    this.scopeService.getProjects(this.apiUrl).subscribe(
      (data) => {
        console.log('Project Scope:', data.items);
        this.scopes = data.items;
      },
      (error) => {
        console.log('Error fetching projects:', error);
      }
    );
  }

  addItem(projectId: string): void {
    let newItem = {projectId, Scope: '', editing: true};
    this.scopes.push(newItem);
    newItem = {projectId, Scope: '', editing: true}; 
  }

  editItem(index: number): void {
    this.scopes[index].editing = true;
  }

  saveItem(index: number, id : string): void {
    const project = this.scopes[index];
    if (id) {
    console.log('Updating project with id:', id); 
      this.scopeService.updateProject(this.apiUrl, id, project).subscribe({
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
      this.scopeService.addProject(this.apiUrl, project).subscribe({
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
    const project = this.scopes[index];
    this.scopeService.deleteProject(this.apiUrl, id).subscribe(
      () => {
        this.scopes.splice(index, 1); // Remove project from projects array
        console.log('Project deleted:', project);
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting project:', error);
      }
    );
  }
}
