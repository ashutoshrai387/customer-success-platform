import { Component, Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

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
      let newItem = {projectId, 'Phase/Milestone Id': '','Date Of Audit': '', 'Reviewed By': '',Status: '', 'Reviewed Section': '','Comment Queries': '', 'Action Item': '',editing: true};
      this.approvedTeams.push(newItem);
      newItem = {projectId, 'Phase/Milestone Id': '', 'Date Of Audit': '', 'Reviewed By': '',Status: '', 'Reviewed Section': '','Comment Queries': '', 'Action Item': '',editing: true};
    }

    cancelItem(index: number, Id: string): void {
      const project = this.approvedTeams[index];
      if (Id) {
        project.editing = false; // Exit editing mode
      } else {
        this.approvedTeams.splice(index, 1); // Remove project from projects array
      }
    }
  
    editItem(index: number): void {
      this.approvedTeams[index].editing = true;
    }
  
    saveItem(index: number, id : string): void {
      const project = this.approvedTeams[index];
      console.log(project);
      if (id) {
      console.log('Updating Approved Teams with id:', id); 
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
        console.log('Adding new item in Approved Teams'); 
        this.approvedTeamService.addProject(this.apiUrl, project).subscribe({
          next: () => {
            project.editing = false; 
            this.loadProjects();
          },
          error: (error) => {
            console.error('Error adding item in Approved Teams:', error);
          }
        });
      } 
    }
  
    deleteItem(index: number,id: string): void {
      console.log('Deleting item in Approved Teams with id:', id); 
      const project = this.approvedTeams[index];
      this.approvedTeamService.deleteProject(this.apiUrl, id).subscribe(
        () => {
          this.approvedTeams.splice(index, 1); 
          console.log('Item deleted:', project);
          this.loadProjects();
        },
        (error) => {
          console.error('Error deleting item in Approved Teams:', error);
        }
      );
    }

    exportPdf(): void {
      const pdf = new jsPDF();
      const table = document.getElementById('dataTable');
      if (!table) {
        console.error('Table element not found.');
        return;
      }
    
      const heading = 'Approved Teams'; // Heading text
      const columnsToInclude = ['Phase/Milestone Id', 'Phase', 'No. Of Resources', 'Role', 'Availability %', 'Duration']; // Columns to include
      const columns: string[] = [];
      const columnIndices: number[] = []; // To store the indices of included columns
      const rows: string[][] = [];
    
      // Add heading to the PDF
      pdf.text(heading, 13, 12); // Adjust position as needed
    
      // Extract table headers (columns)
      table.querySelectorAll('thead th').forEach((th, index) => {
        const columnText = th.textContent?.trim();
        if (columnText && columnsToInclude.includes(columnText)) {
          columns.push(columnText);
          columnIndices.push(index); // Store the index of included column
        }
      });
    
      // Extract rows data
      table.querySelectorAll('tbody tr').forEach(tr => {
        const rowData: string[] = [];
        tr.querySelectorAll('td').forEach((td, index) => {
          // Check if the column index is included
          if (columnIndices.includes(index)) {
            const input = td.querySelector('input');
            if (input) {
              const inputElement = input as HTMLInputElement; // Type assertion
              rowData.push(inputElement.value.trim());
            } else {
              rowData.push(td.textContent?.trim() || ''); // Use text content if no input found
            }
          }
        });
        rows.push(rowData);
      });
    
      // Add the visible data to the PDF
      (pdf as any).autoTable({
        head: [columns],
        body: rows,
      });
    
      // Save the PDF with appropriate file name
      pdf.save('ApprovedTeams.pdf');
    }
}