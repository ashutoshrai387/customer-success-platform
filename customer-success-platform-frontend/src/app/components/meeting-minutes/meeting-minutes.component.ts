import { Component, Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';

@Component({
  selector: 'app-meeting-minutes',
  templateUrl: './meeting-minutes.component.html',
  styleUrl: './meeting-minutes.component.css'
})
export class MeetingMinutesComponent {
  @Input() projectId!: string;
  apiUrl: string = 'https://localhost:44347/api/app/meeting-minute';
  moms: any[] = [];
  

  constructor(private momService: CustomerSuccessService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    console.log('Loading scopes');
    this.momService.getProjects(this.apiUrl).subscribe(
      (data) => {
        console.log('Project Scope:', data.items);
        this.moms = data.items;
      },
      (error) => {
        console.log('Error fetching projects:', error);
      }
    );
  }

  addItem(projectId: string): void {
    let newItem = {projectId, Date: '', Duration: '','MoM Link': '',Comments: '', editing: true};
    this.moms.push(newItem);
    newItem = {projectId, Date: '', Duration: '','MoM Link': '',Comments: '', editing: true}; 
  }

  editItem(index: number): void {
    this.moms[index].editing = true;
  }

  saveItem(index: number, id : string): void {
    const project = this.moms[index];
    if (id) {
    console.log('Updating project with id:', id); 
      this.momService.updateProject(this.apiUrl, id, project).subscribe({
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
      this.momService.addProject(this.apiUrl, project).subscribe({
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
    const project = this.moms[index];
    this.momService.deleteProject(this.apiUrl, id).subscribe(
      () => {
        this.moms.splice(index, 1); 
        console.log('Project deleted:', project);
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting project:', error);
      }
    );
  }
}