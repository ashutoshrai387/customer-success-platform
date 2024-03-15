import { Component, Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrl: './sprint.component.css'
})
export class SprintComponent {
  @Input() projectId!: string;
  apiUrl: string = 'https://localhost:44347/api/app/sprint';
  sprints: any[] = [];
  

  constructor(private sprintService: CustomerSuccessService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    console.log('Loading scopes');
    this.sprintService.getProjects(this.apiUrl).subscribe(
      (data) => {
        console.log('Project Scope:', data.items);
        this.sprints = data.items;
      },
      (error) => {
        console.log('Error fetching projects:', error);
      }
    );
  }

  addItem(projectId: string): void {
    let newItem = {projectId, Sprint: '', 'Start Date': '','End Date': '',Status: Number, Goals: '',Comments: '', editing: true};
    this.sprints.push(newItem);
    newItem = {projectId, Sprint: '', 'Start Date': '','End Date': '',Status: Number, Goals: '',Comments: '', editing: true}; // Clear newItem after adding
  }

  editItem(index: number): void {
    this.sprints[index].editing = true;
  }

  saveItem(index: number, id : string): void {
    const project = this.sprints[index];
    if (id) {
    console.log('Updating project with id:', id); 
      this.sprintService.updateProject(this.apiUrl, id, project).subscribe({
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
      this.sprintService.addProject(this.apiUrl, project).subscribe({
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
    const project = this.sprints[index];
    this.sprintService.deleteProject(this.apiUrl, id).subscribe(
      () => {
        this.sprints.splice(index, 1); // Remove project from projects array
        console.log('Project deleted:', project);
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting project:', error);
      }
    );
  }
}
