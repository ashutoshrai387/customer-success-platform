import { Component, Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-det-timeline-reference',
  templateUrl: './det-timeline-reference.component.html',
  styleUrl: './det-timeline-reference.component.css'
})
export class DetTimelineReferenceComponent {
  @Input() projectId!: string;
  apiUrl: string = 'https://localhost:44347/api/app/det-time-ref';
  timelineref: any[] = [];
  

  constructor(private detimerefService: CustomerSuccessService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    console.log('Loading detailed timiline reference');
    this.detimerefService.getProjects(this.apiUrl).subscribe(
      (data) => {
        console.log('detailed timiline reference:', data.items);
        this.timelineref = data.items;
      },
      (error) => {
        console.log('Error fetching detailed timiline reference:', error);
      }
    );
  }

  addItem(projectId: string): void {
    let newItem = {projectId, 'Detailed Timeline Reference': '', editing: true};
    this.timelineref.push(newItem);
    newItem = {projectId, 'Detailed Timeline Reference': '', editing: true}; // Clear newItem after adding
  }

  cancelItem(index: number, Id: string): void {
    const project = this.timelineref[index];
    if (Id) {
      project.editing = false; // Exit editing mode
    } else {
      this.timelineref.splice(index, 1); // Remove project from projects array
    }
  }

  editItem(index: number): void {
    this.timelineref[index].editing = true;
  }

  saveItem(index: number, id : string): void {
    const project = this.timelineref[index];
    if (id) {
      // Update existing project
      
    console.log('Updating detailed timiline reference with id:', id); 
      this.detimerefService.updateProject(this.apiUrl, id, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error updating detailed timiline reference:', error);
        }
      });
    } else {
      // Add new project
      console.log('Adding detailed timiline reference'); 
      this.detimerefService.addProject(this.apiUrl, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error adding detailed timiline reference:', error);
        }
      });
    }
  }

  deleteItem(index: number,id: string): void {
    console.log('Deleting detailed timiline reference with id:', id); 
    const project = this.timelineref[index];
    this.detimerefService.deleteProject(this.apiUrl, id).subscribe(
      () => {
        this.timelineref.splice(index, 1); // Remove project from projects array
        console.log('detailed timiline reference deleted:', project);
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting detailed timiline reference:', error);
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
  
    const heading = 'Detailed Timeline Reference'; // Heading text
    const columnsToInclude = ['Detailed Timeline Reference']; // Columns to include
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
    pdf.save('DetailedTimelineReference.pdf');
  }
}
