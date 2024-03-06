import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: any[] = [];
  newItem: any = {Name: '', Description: ''};

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    console.log('Loading projects');
    this.projectService.getProjects().subscribe(
      (data) => {
        console.log('Projects:', data.items);
        this.projects = data.items.map((item: any) => ({ Id: item.id, Name: item.name, Description: item.description }));
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
      // Update existing project
      
    console.log('Updating project with id:', id); 
      this.projectService.updateProject(id, project).subscribe({
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
      this.projectService.addProject(project).subscribe({
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
    this.projectService.deleteProject(id).subscribe(
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
