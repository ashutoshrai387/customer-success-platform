import { Component, Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-phases-milestones',
  templateUrl: './phases-milestones.component.html',
  styleUrl: './phases-milestones.component.css'
})
export class PhasesMilestonesComponent {
  @Input() projectId!: string;
  apiUrl: string = 'https://localhost:44347/api/app/phase-milestone';
  phases: any[] = [];
  
  constructor(private phasesService: CustomerSuccessService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    console.log('Loading phases');
    this.phasesService.getProjects(this.apiUrl).subscribe(
      (data) => {
        console.log('Project phases:', data.items);
        this.phases = data.items;
      },
      (error) => {
        console.log('Error fetching phases:', error);
      }
    );
  }

  addItem(projectId: string): void {
    let newItem = {projectId, Title: '', 'Start Date': '','Completion Date': '','Approval Date': '',Status: Number,'Revised Completion Date': '',Comments: '', editing: true};
    this.phases.push(newItem);
    newItem = {projectId, Title: '', 'Start Date': '','Completion Date': '','Approval Date': '',Status: Number,'Revised Completion Date': '',Comments: '', editing: true}; 
  }

  cancelItem(index: number, Id: string): void {
    const project = this.phases[index];
    if (Id) {
      project.editing = false; // Exit editing mode
    } else {
      this.phases.splice(index, 1); // Remove project from projects array
    }
  }

  editItem(index: number): void {
    this.phases[index].editing = true;
  }

  saveItem(index: number, id : string): void {
    const project = this.phases[index];
    console.log('phases display :',project);
    if (id) {
    console.log('Updating phases with id:', id); 
      this.phasesService.updateProject(this.apiUrl, id, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error updating phases:', error);
        }
      });
    } else {
      console.log('Adding phases'); 
      this.phasesService.addProject(this.apiUrl, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error adding phases:', error);
        }
      });
    }
    
  }

  deleteItem(index: number,id: string): void {
    console.log('Deleting phases with id:', id); 
    const project = this.phases[index];
    this.phasesService.deleteProject(this.apiUrl, id).subscribe(
      () => {
        this.phases.splice(index, 1); // Remove project from projects array
        console.log('phases deleted:', project);
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting phases:', error);
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
  
    const heading = 'Phases/Milestone'; // Heading text
    const columnsToInclude = ['Title','Start Date','Completion Date','Approval Date','Status','Revised Completion Date','Comments']; // Columns to include
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
    pdf.save('Phases-Milestone.pdf');
  }
}
