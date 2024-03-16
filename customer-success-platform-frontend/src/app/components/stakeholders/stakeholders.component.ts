import { Component, Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-stakeholders',
  templateUrl: './stakeholders.component.html',
  styleUrl: './stakeholders.component.css'
})
export class StakeholdersComponent {
  @Input() projectId!: string;
  apiUrl: string = 'https://localhost:44347/api/app/stakeholder';
  stakeholders: any[] = [];
  

  constructor(private stakeholderService: CustomerSuccessService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    console.log('Loading stakeholders');
    this.stakeholderService.getProjects(this.apiUrl).subscribe(
      (data) => {
        console.log('Project stakeholders:', data.items);
        this.stakeholders = data.items;
      },
      (error) => {
        console.log('Error fetching stakeholders:', error);
      }
    );
  }

  addItem(projectId: string): void {
    let newItem = {projectId, Title: '', Name: '',Contact: '',Email: '', editing: true};
    this.stakeholders.push(newItem);
    newItem = {projectId, Title: '', Name: '',Contact: '',Email: '', editing: true}; 
  }

  cancelItem(index: number, Id: string): void {
    const project = this.stakeholders[index];
    if (Id) {
      project.editing = false; // Exit editing mode
    } else {
      this.stakeholders.splice(index, 1); // Remove project from projects array
    }
  }

  editItem(index: number): void {
    this.stakeholders[index].editing = true;
  }

  saveItem(index: number, id : string): void {
    const project = this.stakeholders[index];
    if (id) {
    console.log('Updating stakeholders with id:', id); 
      this.stakeholderService.updateProject(this.apiUrl, id, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error updating stakeholders:', error);
        }
      });
    } else {
      console.log('Adding stakeholders'); 
      this.stakeholderService.addProject(this.apiUrl, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error adding stakeholders:', error);
        }
      });
    }    
  }

  deleteItem(index: number,id: string): void {
    console.log('Deleting stakeholders with id:', id); 
    const project = this.stakeholders[index];
    this.stakeholderService.deleteProject(this.apiUrl, id).subscribe(
      () => {
        this.stakeholders.splice(index, 1); // Remove project from projects array
        console.log('stakeholders deleted:', project);
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting stakeholders:', error);
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
  
    const heading = 'Stakeholders'; // Heading text
    const columnsToInclude = ['Title','Name','Contact','Email']; // Columns to include
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
    pdf.save('Stakeholders.pdf');
  }
}
