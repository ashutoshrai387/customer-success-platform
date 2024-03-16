import { Component,Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-version-history',
  templateUrl: './version-history.component.html',
  styleUrl: './version-history.component.css'
})
export class VersionHistoryComponent {
  @Input() projectId!: string;
  private apiUrl = 'https://localhost:44347/api/app/version-history';
  versions: any[] = [];
  

  constructor(private versionService: CustomerSuccessService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    console.log('Loading project versions');
    this.versionService.getProjects(this.apiUrl).subscribe(
      (data) => {
        console.log('Version History:', data.items);
        this.versions = data.items;
      },
      (error) => {
        console.log('Error fetching versions:', error);
      }
    );
  }

  addItem(projectId: string): void {
    let newItem = {projectId, Version: '', Type: '','Change Reason': '', 'Created By': '','Revision Date': '', 'Approval Date': '', 'Approved By': '', editing: true};
    this.versions.push(newItem);
    newItem = {projectId, Version: '', Type: '','Change Reason': '', 'Created By': '','Revision Date': '', 'Approval Date': '', 'Approved By': '', editing: true}; // Clear newItem after adding
  }

  cancelItem(index: number, Id: string): void {
    const project = this.versions[index];
    if (Id) {
      project.editing = false; // Exit editing mode
    } else {
      this.versions.splice(index, 1); // Remove project from projects array
    }
  }

  editItem(index: number): void {
    this.versions[index].editing = true;
  }

  saveItem(index: number, id : string): void {
    const project = this.versions[index];
    if (id) {
    console.log('Updating version history with id:', id); 
      this.versionService.updateProject(this.apiUrl, id, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error updating version history:', error);
        }
      });
    } else {
      console.log('Adding version history'); 
      this.versionService.addProject(this.apiUrl, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error adding version history:', error);
        }
      });
    }
    
  }

  deleteItem(index: number,id: string): void {
    console.log('Deleting version history with id:', id); 
    const project = this.versions[index];
    this.versionService.deleteProject(this.apiUrl, id).subscribe(
      () => {
        this.versions.splice(index, 1); // Remove project from projects array
        console.log('version history deleted:', project);
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting version history:', error);
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
  
    const heading = 'Version History'; // Heading text
    const columnsToInclude = ['Version','Type','Change','Change Reason','Created By','Revision Date','Approval Date','Approved By']; // Columns to include
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
    pdf.save('VersionHistory.pdf');
  }
}