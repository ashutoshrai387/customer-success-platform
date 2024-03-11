import { Component } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';

@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrl: './project-description.component.css'
})
export class ProjectDescriptionComponent {

  apiUrl: string = 'https://localhost:44347/api/app/project-description';
  descriptions: any[] = [];
  newItem: any = {Description: ''};

  constructor(private projectDescriptionService: CustomerSuccessService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    console.log('Loading descriptions');
    this.projectDescriptionService.getProjects(this.apiUrl).subscribe(
      (data) => {
        console.log('Project Descriptions:', data.items);
        // this.projects = data.items.map((item: any) => ({ Id: item.id, Description: item.description }));
        this.descriptions = data.items;
      },
      (error) => {
        console.log('Error fetching projects:', error);
      }
    );
  }

  addItem(): void {
    this.descriptions.push({ ...this.newItem, editing: true });
    this.newItem = { Name: '', Description: '' }; // Clear newItem after adding
  }

  editItem(index: number): void {
    this.descriptions[index].editing = true;
  }

  saveItem(index: number, id : string): void {
    const project = this.descriptions[index];
    if (id) {
      // Update existing project
      
    console.log('Updating project with id:', id); 
      this.projectDescriptionService.updateProject(this.apiUrl, id, project).subscribe({
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
      this.projectDescriptionService.addProject(this.apiUrl, project).subscribe({
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
    const project = this.descriptions[index];
    this.projectDescriptionService.deleteProject(this.apiUrl, id).subscribe(
      () => {
        this.descriptions.splice(index, 1); // Remove project from projects array
        console.log('Project deleted:', project);
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting project:', error);
      }
    );
  }
}
