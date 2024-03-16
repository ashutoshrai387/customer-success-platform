import { Component, Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';

@Component({
  selector: 'app-escalation-matrix',
  templateUrl: './escalation-matrix.component.html',
  styleUrl: './escalation-matrix.component.css'
})
export class EscalationMatrixComponent {
  @Input() projectId!: string;
  apiUrl: string = 'https://localhost:44347/api/app/escalation-matrix';
  escalations: any[] = [];
  

  constructor(private escalationMatrixService: CustomerSuccessService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    console.log('Loading escalations');
    this.escalationMatrixService.getProjects(this.apiUrl).subscribe(
      (data) => {
        console.log('escalations:', data.items);
        this.escalations = data.items;
      },
      (error) => {
        console.log('Error fetching escalations:', error);
      }
    );
  }

  addItem(projectId: string,escalationType: number): void {
    let newItem = {projectId, escalationType, Duration: '', EscalationLevel: Number, Name: '', Role: '', editing: true};
    this.escalations.push(newItem);
    newItem = {projectId, escalationType, Duration: '', EscalationLevel: Number, Name: '', Role: '', editing: true}; // Clear newItem after adding
  }

  cancelItem(index: number, Id: string): void {
    const project = this.escalations[index];
    if (Id) {
      project.editing = false; // Exit editing mode
    } else {
      this.escalations.splice(index, 1); // Remove project from projects array
    }
  }

  editItem(index: number): void {
    this.escalations[index].editing = true;
  }

  saveItem(index: number, id : string): void {
    const project = this.escalations[index];
    if (id) {
    console.log('Updating escalations with id:', id); 
      this.escalationMatrixService.updateProject(this.apiUrl, id, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error updating escalations:', error);
        }
      });
    } else {
      console.log('Adding escalations'); 
      this.escalationMatrixService.addProject(this.apiUrl, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error adding escalations:', error);
        }
      });
    }
  }

  deleteItem(index: number,id: string): void {
    console.log('Deleting escalations with id:', id); 
    const project = this.escalations[index];
    this.escalationMatrixService.deleteProject(this.apiUrl, id).subscribe(
      () => {
        this.escalations.splice(index, 1); // Remove project from projects array
        console.log('escalations deleted:', project);
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting escalations:', error);
      }
    );
  }
}
