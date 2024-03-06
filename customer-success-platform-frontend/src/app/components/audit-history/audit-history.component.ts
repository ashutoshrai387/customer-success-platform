import { Component,OnInit } from '@angular/core';
import { AuditHistoryService } from '../../services/audithistory.service';

@Component({
  selector: 'app-audit-history',
  templateUrl: './audit-history.component.html',
  styleUrl: './audit-history.component.css'
})
export class AuditHistoryComponent implements OnInit{

    audits: any[] = [];
    newItem: any = {DateOfAudit: '', ReviewedBy: '',Status: '', ReviewedSection: '',CommentQueries: '', ActionItem: ''};
  
    constructor(private auditService: AuditHistoryService) { }
  
    ngOnInit(): void {
      this.loadProjects();
    }
  
    loadProjects(): void {
      console.log('Loading projects');
      this.auditService.getProjects().subscribe(
        (data) => {
          console.log('Audit History:', data.items);
          this.audits = data.items.map((item: any) => ({ Id: item.id, DateOfAudit: item.dateOfAudit, ReviewedBy: item.reviewedBy,Status: item.status, ReviewedSection: item.reviewedSection, CommentQueries: item.commentQueries,ActionItem: item.actionItem }));
        },
        (error) => {
          console.log('Error fetching projects:', error);
        }
      );
    }
  
    addItem(): void {
      this.audits.push({ ...this.newItem, editing: true });
      this.newItem = {DateOfAudit: '', ReviewedBy: '',Status: '', ReviewedSection: '',CommentQueries: '', ActionItem: ''}; // Clear newItem after adding
    }
  
    editItem(index: number): void {
      this.audits[index].editing = true;
    }
  
    saveItem(index: number, id : string): void {
      const project = this.audits[index];
      if (id) {
        // Update existing project
        
      console.log('Updating project with id:', id); 
        this.auditService.updateProject(id, project).subscribe({
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
        this.auditService.addProject(project).subscribe({
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
      const project = this.audits[index];
      this.auditService.deleteProject(id).subscribe(
        () => {
          this.audits.splice(index, 1); // Remove project from projects array
          console.log('Project deleted:', project);
          this.loadProjects();
        },
        (error) => {
          console.error('Error deleting project:', error);
        }
      );
    }
  }
