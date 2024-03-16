import { Component, Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-risk-profiles',
  templateUrl: './risk-profiles.component.html',
  styleUrl: './risk-profiles.component.css'
})

export class RiskProfilesComponent {
  @Input() projectId!: string;
  apiUrl: string = 'https://localhost:44347/api/app/risk-profile';
  riskProfiles: any[] = [];
  

  constructor(private riskProfileService: CustomerSuccessService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    console.log('Loading Risk Profiles');
    this.riskProfileService.getProjects(this.apiUrl).subscribe(
      (data) => {
        console.log('Risk Profiles:', data.items);
        this.riskProfiles = data.items;
      },
      (error) => {
        console.log('Error fetching Risk Profiles:', error);
      }
    );
  }

  addItem(projectId: string): void {
    let newItem = {projectId, RiskType: Number, Description: '',Severity: Number, Impact: Number, RemedialSteps: '',Status: '','Closure Date': '', editing: true};
    this.riskProfiles.push(newItem);
    newItem = {projectId, RiskType: Number, Description: '',Severity: Number, Impact: Number, RemedialSteps: '',Status: '','Closure Date': '', editing: true}; // Clear newItem after adding
  }

  cancelItem(index: number, Id: string): void {
    const project = this.riskProfiles[index];
    if (Id) {
      project.editing = false; // Exit editing mode
    } else {
      this.riskProfiles.splice(index, 1); // Remove project from projects array
    }
  }

  editItem(index: number): void {
    this.riskProfiles[index].editing = true;
  }

  saveItem(index: number, id : string): void {
    const project = this.riskProfiles[index];
    if (id) {
    console.log('Updating Risk Profiles with id:', id); 
      this.riskProfileService.updateProject(this.apiUrl, id, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error updating Risk Profiles:', error);
        }
      });
    } else {
      console.log('Adding Risk Profiles'); 
      this.riskProfileService.addProject(this.apiUrl, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error adding Risk Profiles:', error);
        }
      });
    }
    
  }

  deleteItem(index: number,id: string): void {
    console.log('Deleting Risk Profiles with id:', id); 
    const project = this.riskProfiles[index];
    this.riskProfileService.deleteProject(this.apiUrl, id).subscribe(
      () => {
        this.riskProfiles.splice(index, 1); // Remove project from projects array
        console.log('Risk Profiles deleted:', project);
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting Risk Profiles:', error);
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
  
    const heading = 'Risk Profiles'; // Heading text
    const columnsToInclude = ['Risk Type', 'Description', 'Severity', 'Impact', 'Remedial Steps', 'Status', 'Closure Date']; // Columns to include
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
    pdf.save('RiskProfiles.pdf');
  }
}
