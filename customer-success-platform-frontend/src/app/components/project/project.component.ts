import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects: any[] = [];
  newItem: any = { Name: '', Description: '' };

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(
      (data) => {
        console.log('Projects:', data.items)
        this.projects = data.items;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  addItem(): void {
    this.projects.push({ ...this.newItem });
    this.newItem = { Name: '', Description: '' }; // Clear newItem after adding
  }

  editItem(index: number): void {
    this.projects[index].editing = true;
  }

  saveItem(index: number): void {
    const project = this.projects[index];
    if (project.id) {
      // Update existing project
      this.projectService.updateProject(project.id, project).subscribe(
        () => {
          project.editing = false; // Exit editing mode
        },
        (error) => {
          console.error('Error updating project:', error);
        }
      );
    } else {
      // Add new project
      this.projectService.addProject(project).subscribe(
        () => {
          project.editing = false; // Exit editing mode
        },
        (error) => {
          console.error('Error adding project:', error);
        }
      );
    }
  }

  deleteItem(index: number): void {
    const project = this.projects[index];
    this.projectService.deleteProject(project.id).subscribe(
      () => {
        this.projects.splice(index, 1); // Remove project from projects array
      },
      (error) => {
        console.error('Error deleting project:', error);
      }
    );
  }
}
