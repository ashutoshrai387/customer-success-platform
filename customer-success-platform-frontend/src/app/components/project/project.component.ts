import { Component, OnInit } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  apiUrl: string = 'https://localhost:44347/api/app/project';
  projects: any[] = [];
  // selectedProjectId: string = '';
  newItem: any = {Name: '', Description: ''};

  constructor(private projectService: CustomerSuccessService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    console.log('Loading projects');
    this.projectService.getProjects(this.apiUrl).subscribe(
      (data) => {
        console.log('Projects:', data.items);
        this.projects = data.items;
      },
      (error) => {
        console.log('Error fetching projects:', error);
      }
    );
  }

  addItem(): void {
    this.projects.push({ ...this.newItem, editing: true });
    this.newItem = { Name: '', Description: '' }; // Clear newItem after adding
  }

  editItem(index: number): void {
    this.projects[index].editing = true;
  }

  saveItem(index: number, id : string): void {
    const project = this.projects[index];
    if (id) {
    console.log('Updating project with id:', id); 
      this.projectService.updateProject(this.apiUrl, id, project).subscribe({
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
      this.projectService.addProject(this.apiUrl, project).subscribe({
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
    const project = this.projects[index];
    this.projectService.deleteProject(this.apiUrl, id).subscribe(
      () => {
        this.projects.splice(index, 1); // Remove project from projects array
        console.log('Project deleted:', project);
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting project:', error);
      }
    );
  }
}
