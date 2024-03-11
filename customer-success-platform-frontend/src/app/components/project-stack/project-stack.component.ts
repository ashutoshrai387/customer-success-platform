import { Component } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';

@Component({
  selector: 'app-project-stack',
  templateUrl: './project-stack.component.html',
  styleUrl: './project-stack.component.css'
})
export class ProjectStackComponent {

  apiUrl: string = 'https://localhost:44347/api/app/project-stack';
  projectStacks: any[] = [];
  newItem: any = {Name: ''};

  constructor(private projectStackService: CustomerSuccessService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    console.log('Loading stacks');
    this.projectStackService.getProjects(this.apiUrl).subscribe(
      (data) => {
        console.log('Project Stacks:', data.items);
        // this.projects = data.items.map((item: any) => ({ Id: item.id, Name: item.name }));
        this.projectStacks = data.items;
      },
      (error) => {
        console.log('Error fetching projects:', error);
      }
    );
  }

  addItem(): void {
    this.projectStacks.push({ ...this.newItem, editing: true });
    this.newItem = { Name: '', Description: '' }; // Clear newItem after adding
  }

  editItem(index: number): void {
    this.projectStacks[index].editing = true;
  }

  saveItem(index: number, id : string): void {
    const project = this.projectStacks[index];
    if (id) {
      // Update existing project
      
    console.log('Updating project with id:', id); 
      this.projectStackService.updateProject(this.apiUrl, id, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error updating project:', error);
        }
      });
    } else {
      // Add new project
      console.log('Adding project'); 
      this.projectStackService.addProject(this.apiUrl, project).subscribe({
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
    const project = this.projectStacks[index];
    this.projectStackService.deleteProject(this.apiUrl, id).subscribe(
      () => {
        this.projectStacks.splice(index, 1); // Remove project from projects array
        console.log('Project deleted:', project);
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting project:', error);
      }
    );
  }
}
