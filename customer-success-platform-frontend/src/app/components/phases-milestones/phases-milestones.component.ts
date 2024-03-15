import { Component, Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';

@Component({
  selector: 'app-phases-milestones',
  templateUrl: './phases-milestones.component.html',
  styleUrl: './phases-milestones.component.css'
})
export class PhasesMilestonesComponent {
  @Input() projectId!: string;
  apiUrl: string = 'https://localhost:44347/api/app/phase-milestone';
  phases: any[] = [];
  phasesCount!: number;
  

  constructor(private phasesService: CustomerSuccessService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    console.log('Loading phases');
    this.phasesService.getProjects(this.apiUrl).subscribe(
      (data) => {
        console.log('Project phases:', data.items);
        this.phases = data.items;
        this.phasesCount = data.totalCount;
      },
      (error) => {
        console.log('Error fetching projects:', error);
      }
    );
  }

  addItem(projectId: string): void {
    let newItem = {projectId, Title: '', 'Start Date': '','Completion Date': '','Approval Date': '',Status: Number,'Revised Completion Date': '',Comments: '', editing: true};
    this.phases.push(newItem);
    newItem = {projectId, Title: '', 'Start Date': '','Completion Date': '','Approval Date': '',Status: Number,'Revised Completion Date': '',Comments: '', editing: true}; 
  }

  editItem(index: number): void {
    this.phases[index].editing = true;
  }

  saveItem(index: number, id : string): void {
    const project = this.phases[index];
    console.log('phases display :',project);
    if (id) {
    console.log('Updating phases with id:', id); 
      this.phasesService.updateProject(this.apiUrl, id, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error updating project:', error);
        }
      });
    } else {
      console.log('Adding phases'); 
      this.phasesService.addProject(this.apiUrl, project).subscribe({
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
    const project = this.phases[index];
    this.phasesService.deleteProject(this.apiUrl, id).subscribe(
      () => {
        this.phases.splice(index, 1); // Remove project from projects array
        console.log('Project deleted:', project);
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting project:', error);
      }
    );
  }
}
