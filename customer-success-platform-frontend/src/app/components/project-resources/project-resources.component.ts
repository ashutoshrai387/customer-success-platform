import { Component, Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-project-resources',
  templateUrl: './project-resources.component.html',
  styleUrl: './project-resources.component.css'
})
export class ProjectResourcesComponent {
  @Input() projectId!: string;
  apiUrl: string = 'https://localhost:44347/api/app/project-resources';
  resources: any[] = [];
  

  constructor(private resourceService: CustomerSuccessService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    console.log('Loading resources');
    this.resourceService.getProjects(this.apiUrl).subscribe(
      (data) => {
        console.log('Project resources:', data.items);
        this.resources = data.items;
      },
      (error) => {
        console.log('Error fetching resources:', error);
      }
    );
  }

  addItem(projectId: string): void {
    let newItem = {projectId, 'Resource Name': '', Role: '', 'Start Date': '', 'End Date': '',Comment: '', editing: true};
    this.resources.push(newItem);
    newItem = {projectId, 'Resource Name': '', Role: '', 'Start Date': '', 'End Date': '',Comment: '', editing: true}; // Clear newItem after adding
  }

  cancelItem(index: number, Id: string): void {
    const project = this.resources[index];
    if (Id) {
      project.editing = false; // Exit editing mode
    } else {
      this.resources.splice(index, 1); // Remove project from projects array
    }
  }

  editItem(index: number): void {
    this.resources[index].editing = true;
  }

  saveItem(index: number, id : string): void {
    const project = this.resources[index];
    if (id) {
    console.log('Updating resources with id:', id); 
      this.resourceService.updateProject(this.apiUrl, id, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error updating resources:', error);
        }
      });
    } else {
      console.log('Adding resources'); 
      this.resourceService.addProject(this.apiUrl, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error adding resources:', error);
        }
      });
    }    
  }

  deleteItem(index: number,id: string): void {
    console.log('Deleting resources with id:', id); 
    const project = this.resources[index];
    this.resourceService.deleteProject(this.apiUrl, id).subscribe(
      () => {
        this.resources.splice(index, 1); // Remove project from projects array
        console.log('resources deleted:', project);
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting resources:', error);
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
  
    const heading = 'Project Resources'; // Heading text
    const columnsToInclude = ['Resource Name','Role','Start Date','End Date','Comment']; // Columns to include
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
    pdf.save('ProjectResources.pdf');
  }
}
