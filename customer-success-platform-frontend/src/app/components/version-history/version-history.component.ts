import { Component } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';

@Component({
  selector: 'app-version-history',
  templateUrl: './version-history.component.html',
  styleUrl: './version-history.component.css'
})
export class VersionHistoryComponent {

  private apiUrl = 'https://localhost:44347/api/app/version-history';
  versions: any[] = [];
  newItem: any = {Version: '', Type: '','Change Reason': '', 'Created By': '','Revision Date': '', 'Approval Date': '', 'Approved By': ''};

  constructor(private versionService: CustomerSuccessService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    console.log('Loading projects');
    this.versionService.getProjects(this.apiUrl).subscribe(
      (data) => {
        console.log('Version History:', data.items);
        // this.versions = data.items.map((item: any) => ({ Id: item.id, DateOfAudit: item.dateOfAudit, ReviewedBy: item.reviewedBy,Status: item.status, ReviewedSection: item.reviewedSection, CommentQueries: item.commentQueries,ActionItem: item.actionItem }));
        this.versions = data.items;
      },
      (error) => {
        console.log('Error fetching projects:', error);
      }
    );
  }

  addItem(): void {
    this.versions.push({ ...this.newItem, editing: true });
    this.newItem = {DateOfAudit: '', ReviewedBy: '',Status: '', ReviewedSection: '',CommentQueries: '', ActionItem: ''}; // Clear newItem after adding
  }

  editItem(index: number): void {
    this.versions[index].editing = true;
  }

  saveItem(index: number, id : string): void {
    const project = this.versions[index];
    if (id) {
      // Update existing project
      
    console.log('Updating project with id:', id); 
      this.versionService.updateProject(this.apiUrl, id, project).subscribe({
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
      this.versionService.addProject(this.apiUrl, project).subscribe({
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
    const project = this.versions[index];
    this.versionService.deleteProject(this.apiUrl, id).subscribe(
      () => {
        this.versions.splice(index, 1); // Remove project from projects array
        console.log('Project deleted:', project);
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting project:', error);
      }
    );
  }
}