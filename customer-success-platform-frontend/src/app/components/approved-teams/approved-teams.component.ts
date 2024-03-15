import { Component, Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';

@Component({
  selector: 'app-approved-teams',
  templateUrl: './approved-teams.component.html',
  styleUrl: './approved-teams.component.css'
})
export class ApprovedTeamsComponent {
  @Input() projectId!: string;

    private apiUrl = 'https://localhost:44347/api/app/approved-team';
    approvedTeams: any[] = [];
    
  
    constructor(private approvedTeamService: CustomerSuccessService) { }
  
    ngOnInit(): void {
      this.loadProjects();
    }
  
    loadProjects(): void {
      console.log('Loading approved teams :', this.projectId);
      this.approvedTeamService.getProjects(this.apiUrl).subscribe(
        (data) => {
          console.log('Approved Teams:', data.items);
          this.approvedTeams = data.items;
        },
        (error) => {
          console.log('Error fetching Approved Teams:', error);
        }
      );
    }
  
    addItem(projectId: string): void {
      console.log('Adding audit :',projectId);
      let newItem = {projectId, 'Phase/Milestone Id': '','Date Of Audit': '', 'Reviewed By': '',Status: '', 'Reviewed Section': '','Comment Queries': '', 'Action Item': '',editing: true};
      this.approvedTeams.push(newItem);
      newItem = {projectId, 'Phase/Milestone Id': '', 'Date Of Audit': '', 'Reviewed By': '',Status: '', 'Reviewed Section': '','Comment Queries': '', 'Action Item': '',editing: true};
    }
  
    editItem(index: number): void {
      this.approvedTeams[index].editing = true;
    }
  
    saveItem(index: number, id : string): void {
      console.log('test',index,id);
      const project = this.approvedTeams[index];
      console.log(project);
      if (id) {
        
      console.log('Updating project with id:', id); 
        this.approvedTeamService.updateProject(this.apiUrl, id, project).subscribe({
          next: () => {
            project.editing = false; 
            this.loadProjects(); 
          },
          error: (error) => {
            console.error('Error updating project:', error);
          }
        });
      } else {
        console.log('Adding project'); 
        this.approvedTeamService.addProject(this.apiUrl, project).subscribe({
          next: () => {
            project.editing = false; 
            this.loadProjects();
          },
          error: (error) => {
            console.error('Error adding project:', error);
          }
        });
      } 
    }
  
    deleteItem(index: number,id: string): void {
      console.log('Deleting project with id:', id); 
      const project = this.approvedTeams[index];
      this.approvedTeamService.deleteProject(this.apiUrl, id).subscribe(
        () => {
          this.approvedTeams.splice(index, 1); 
          console.log('Project deleted:', project);
          this.loadProjects();
        },
        (error) => {
          console.error('Error deleting project:', error);
        }
      );
    }
}
