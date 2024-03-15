import { Component,OnInit,Input,SimpleChanges } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';

@Component({
  selector: 'app-audit-history',
  templateUrl: './audit-history.component.html',
  styleUrl: './audit-history.component.css',
})

export class AuditHistoryComponent implements OnInit{
  @Input() projectId!: string;

    private apiUrl = 'https://localhost:44347/api/app/audit-history';
    audits: any[] = [];
    
  
    constructor(private auditService: CustomerSuccessService) { }

    ngOnInit(): void {
      this.loadProjects();
    }
  
    loadProjects(): void {
      console.log('Loading audits :', this.projectId);
      this.auditService.getProjects(this.apiUrl).subscribe(
        (data) => {
          console.log('Audit History:', data.items);
          this.audits = data.items;
        },
        (error) => {
          console.log('Error fetching projects:', error);
        }
      );
    }
  
    addItem(projectId: string): void {
      console.log('Adding audit :',projectId);
      let newItem = {projectId, 'Date Of Audit': '', 'Reviewed By': '',Status: '', 'Reviewed Section': '','Comment Queries': '', 'Action Item': '',editing: true};
      this.audits.push(newItem);
      newItem = {projectId,'Date Of Audit': '', 'Reviewed By': '',Status: '', 'Reviewed Section': '','Comment Queries': '', 'Action Item': '',editing: true}; 
    }
  
    editItem(index: number): void {
      this.audits[index].editing = true;
    }
  
    saveItem(index: number, id : string): void {
      console.log('test',index,id);
      const project = this.audits[index];
      console.log(project);
      if (id) {
        
      console.log('Updating project with id:', id); 
        this.auditService.updateProject(this.apiUrl, id, project).subscribe({
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
        this.auditService.addProject(this.apiUrl, project).subscribe({
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
      const project = this.audits[index];
      this.auditService.deleteProject(this.apiUrl, id).subscribe(
        () => {
          this.audits.splice(index, 1); 
          console.log('Project deleted:', project);
          this.loadProjects();
        },
        (error) => {
          console.error('Error deleting project:', error);
        }
      );
    }
  }
