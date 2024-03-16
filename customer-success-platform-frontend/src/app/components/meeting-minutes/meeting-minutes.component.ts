import { Component, Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

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
    console.log('Loading moms');
    this.momService.getProjects(this.apiUrl).subscribe(
      (data) => {
        console.log('Project moms:', data.items);
        this.moms = data.items;
      },
      (error) => {
        console.log('Error fetching moms:', error);
      }
    );
  }

  addItem(projectId: string): void {
    let newItem = {projectId, Date: '', Duration: '','MoM Link': '',Comments: '', editing: true};
    this.moms.push(newItem);
    newItem = {projectId, Date: '', Duration: '','MoM Link': '',Comments: '', editing: true}; 
  }

  cancelItem(index: number, Id: string): void {
    const project = this.moms[index];
    if (Id) {
      project.editing = false; // Exit editing mode
    } else {
      this.moms.splice(index, 1); // Remove project from projects array
    }
  }

  editItem(index: number): void {
    this.moms[index].editing = true;
  }

  saveItem(index: number, id : string): void {
    const project = this.moms[index];
    if (id) {
    console.log('Updating moms with id:', id); 
      this.momService.updateProject(this.apiUrl, id, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error updating moms:', error);
        }
      });
    } else {
      console.log('Adding moms'); 
      this.momService.addProject(this.apiUrl, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error adding moms:', error);
        }
      });
    }
    
  }

  deleteItem(index: number,id: string): void {
    console.log('Deleting moms with id:', id); 
    const project = this.moms[index];
    this.momService.deleteProject(this.apiUrl, id).subscribe(
      () => {
        this.moms.splice(index, 1); 
        console.log('moms deleted:', project);
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting moms:', error);
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
  
    const heading = 'MoMs of Client Meetings'; // Heading text
    const columnsToInclude = ['Date','Duration','MoM Link','Comments']; // Columns to include
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
    pdf.save('MoMs.pdf');
  }
}