import { Component, Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-project-updates',
  templateUrl: './project-updates.component.html',
  styleUrl: './project-updates.component.css'
})

export class ProjectUpdatesComponent {
  @Input() projectId!: string;
  apiUrl: string = 'https://localhost:44347/api/app/project-updates';
  updates: any[] = [];
  
  constructor(private projectUpdateService: CustomerSuccessService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    console.log('Loading updates');
    this.projectUpdateService.getProjects(this.apiUrl).subscribe(
      (data) => {
        console.log('Project updates:', data.items);
        this.updates = data.items;
      },
      (error) => {
        console.log('Error fetching updates:', error);
      }
    );
  }

  addItem(projectId: string): void {
    let newItem = {projectId, 'Update Date': '', 'General Updates': '', editing: true};
    this.updates.push(newItem);
    newItem = {projectId, 'Update Date': '', 'General Updates': '', editing: true}; 
  }

  cancelItem(index: number, Id: string): void {
    const project = this.updates[index];
    if (Id) {
      project.editing = false; // Exit editing mode
    } else {
      this.updates.splice(index, 1); // Remove project from projects array
    }
  }

  editItem(index: number): void {
    this.updates[index].editing = true;
  }

  saveItem(index: number, id : string): void {
    const project = this.updates[index];
    if (id) {
    console.log('Updating project updates with id:', id); 
      this.projectUpdateService.updateProject(this.apiUrl, id, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error updating project:', error);
        }
      });
    } else {
      console.log('Adding project updates'); 
      this.projectUpdateService.addProject(this.apiUrl, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error adding project updates:', error);
        }
      });
    }
    
  }

  deleteItem(index: number,id: string): void {
    console.log('Deleting project updates with id:', id); 
    const project = this.updates[index];
    this.projectUpdateService.deleteProject(this.apiUrl, id).subscribe(
      () => {
        this.updates.splice(index, 1); // Remove project from projects array
        console.log('Project updates deleted:', project);
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting project updates:', error);
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
  
    const heading = 'Project Updates'; // Heading text
    const columnsToInclude = ['Date','General Updates']; // Columns to include
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
    pdf.save('ProjectUpdates.pdf');
  }
}
