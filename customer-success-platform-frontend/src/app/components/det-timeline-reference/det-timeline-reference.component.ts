import { Component, Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';

@Component({
  selector: 'app-det-timeline-reference',
  templateUrl: './det-timeline-reference.component.html',
  styleUrl: './det-timeline-reference.component.css'
})
export class DetTimelineReferenceComponent {
  @Input() projectId!: string;
  apiUrl: string = 'https://localhost:44347/api/app/det-time-ref';
  timelineref: any[] = [];
  

  constructor(private detimerefService: CustomerSuccessService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    console.log('Loading scopes');
    this.detimerefService.getProjects(this.apiUrl).subscribe(
      (data) => {
        console.log('Project Scope:', data.items);
        this.timelineref = data.items;
      },
      (error) => {
        console.log('Error fetching projects:', error);
      }
    );
  }

  addItem(projectId: string): void {
    let newItem = {projectId, 'Detailed Timeline Reference': '', editing: true};
    this.timelineref.push(newItem);
    newItem = {projectId, 'Detailed Timeline Reference': '', editing: true}; // Clear newItem after adding
  }

  editItem(index: number): void {
    this.timelineref[index].editing = true;
  }

  saveItem(index: number, id : string): void {
    const project = this.timelineref[index];
    if (id) {
      // Update existing project
      
    console.log('Updating project with id:', id); 
      this.detimerefService.updateProject(this.apiUrl, id, project).subscribe({
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
      this.detimerefService.addProject(this.apiUrl, project).subscribe({
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
    const project = this.timelineref[index];
    this.detimerefService.deleteProject(this.apiUrl, id).subscribe(
      () => {
        this.timelineref.splice(index, 1); // Remove project from projects array
        console.log('Project deleted:', project);
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting project:', error);
      }
    );
  }
}
