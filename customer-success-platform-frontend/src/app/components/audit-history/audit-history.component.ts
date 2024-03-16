import { Component,OnInit, Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

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
          console.log('Error fetching audits:', error);
        }
      );
    }
  
    addItem(projectId: string): void {
      console.log('Adding audits for project id :',projectId);
      let newItem = {projectId, 'Date Of Audit': '', 'Reviewed By': '',Status: '', 'Reviewed Section': '','Comment Queries': '', 'Action Item': '',editing: true};
      this.audits.push(newItem);
      newItem = {projectId,'Date Of Audit': '', 'Reviewed By': '',Status: '', 'Reviewed Section': '','Comment Queries': '', 'Action Item': '',editing: true}; 
    }

    cancelItem(index: number, Id: string): void {
      const project = this.audits[index];
      if (Id) {
        project.editing = false; // Exit editing mode
      } else {
        this.audits.splice(index, 1); // Remove project from projects array
      }
    }
  
    editItem(index: number): void {
      this.audits[index].editing = true;
    }
  
    saveItem(index: number, id : string): void {
      const project = this.audits[index];
      console.log(project);
      if (id) {
        
      console.log('Updating audits with id:', id); 
        this.auditService.updateProject(this.apiUrl, id, project).subscribe({
          next: () => {
            project.editing = false;
            this.loadProjects(); 
          },
          error: (error) => {
            console.error('Error updating audits:', error);
          }
        });
      } else {
        console.log('Adding audits'); 
        this.auditService.addProject(this.apiUrl, project).subscribe({
          next: () => {
            project.editing = false; 
            this.loadProjects(); 
          },
          error: (error) => {
            console.error('Error adding audits:', error);
          }
        });
      }
      
    }
  
    deleteItem(index: number,id: string): void {
      console.log('Deleting audits with id:', id); 
      const project = this.audits[index];
      this.auditService.deleteProject(this.apiUrl, id).subscribe(
        () => {
          this.audits.splice(index, 1); 
          console.log('audit item deleted:', project);
          this.loadProjects();
        },
        (error) => {
          console.error('Error deleting audit:', error);
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
    
      const heading = 'Audit History'; // Heading text
      const columnsToInclude = ['Date Of Audit', 'Reviewed By', 'Status', 'Reviewed Section', 'Comment Queries', 'Action Item']; // Columns to include
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
      pdf.save('AuditHistory.pdf');
    }
}
