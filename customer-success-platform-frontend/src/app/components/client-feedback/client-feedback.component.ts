import { Component, Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';

@Component({
  selector: 'app-client-feedback',
  templateUrl: './client-feedback.component.html',
  styleUrl: './client-feedback.component.css'
})
export class ClientFeedbackComponent {
  @Input() projectId!: string;

    private apiUrl = 'https://localhost:44347/api/app/client-feedback';
    feedbacks: any[] = [];
    
    constructor(private clientFeedbackService: CustomerSuccessService) { }

    ngOnInit(): void {
      this.loadProjects();
    }
  
    loadProjects(): void {
      console.log('Loading audits :', this.projectId);
      this.clientFeedbackService.getProjects(this.apiUrl).subscribe(
        (data) => {
          console.log('Audit History:', data.items);
          this.feedbacks = data.items;
        },
        (error) => {
          console.log('Error fetching projects:', error);
        }
      );
    }
  
    addItem(projectId: string): void {
      console.log('Adding audit :',projectId);
      let newItem = {projectId, 'Feedback Type': '', 'Date Received': '','Detailed Feedback': '', 'Action Taken': '','Closure Date': '', editing: true};
      this.feedbacks.push(newItem);
      newItem = {projectId, 'Feedback Type': '', 'Date Received': '','Detailed Feedback': '', 'Action Taken': '','Closure Date': '', editing: true}; // Clear newItem after adding
    }
  
    editItem(index: number): void {
      this.feedbacks[index].editing = true;
    }
  
    saveItem(index: number, id : string): void {
      console.log('test',index,id);
      const project = this.feedbacks[index];
      console.log(project);
      if (id) {
      console.log('Updating project with id:', id); 
        this.clientFeedbackService.updateProject(this.apiUrl, id, project).subscribe({
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
        this.clientFeedbackService.addProject(this.apiUrl, project).subscribe({
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
      const project = this.feedbacks[index];
      this.clientFeedbackService.deleteProject(this.apiUrl, id).subscribe(
        () => {
          this.feedbacks.splice(index, 1); // Remove project from projects array
          console.log('Project deleted:', project);
          this.loadProjects();
        },
        (error) => {
          console.error('Error deleting project:', error);
        }
      );
    }
}
