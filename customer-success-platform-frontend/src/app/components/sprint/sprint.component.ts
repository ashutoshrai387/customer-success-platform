import { Component, Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrl: './sprint.component.css'
})
export class SprintComponent {
  @Input() projectId!: string;
  apiUrl: string = 'https://localhost:44347/api/app/sprint';
  sprints: any[] = [];
  

  constructor(private sprintService: CustomerSuccessService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    console.log('Loading sprints');
    this.sprintService.getProjects(this.apiUrl).subscribe(
      (data) => {
        console.log('Project sprints:', data.items);
        this.sprints = data.items;
      },
      (error) => {
        console.log('Error fetching projects sprints:', error);
      }
    );
  }

  addItem(projectId: string): void {
    let newItem = {projectId, Sprint: '', 'Start Date': '','End Date': '',Status: Number, Goals: '',Comments: '', editing: true};
    this.sprints.push(newItem);
    newItem = {projectId, Sprint: '', 'Start Date': '','End Date': '',Status: Number, Goals: '',Comments: '', editing: true}; // Clear newItem after adding
  }

  cancelItem(index: number, Id: string): void {
    const project = this.sprints[index];
    if (Id) {
      project.editing = false; // Exit editing mode
    } else {
      this.sprints.splice(index, 1); // Remove project from projects array
    }
  }

  editItem(index: number): void {
    this.sprints[index].editing = true;
  }

  saveItem(index: number, id : string): void {
    const project = this.sprints[index];
    if (id) {
    console.log('Updating project sprints with id:', id); 
      this.sprintService.updateProject(this.apiUrl, id, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error updating project sprints:', error);
        }
      });
    } else {
      console.log('Adding project sprints'); 
      this.sprintService.addProject(this.apiUrl, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error adding project sprints:', error);
        }
      });
    }    
  }

  deleteItem(index: number,id: string): void {
    console.log('Deleting project sprints with id:', id); 
    const project = this.sprints[index];
    this.sprintService.deleteProject(this.apiUrl, id).subscribe(
      () => {
        this.sprints.splice(index, 1); // Remove project from projects array
        console.log('Project sprint deleted:', project);
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting project sprint:', error);
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
  
    const heading = 'Sprints'; // Heading text
    const columnsToInclude = ['Sprint No.','Start Date','End Date','Status','Goals','Comments']; // Columns to include
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
    pdf.save('Sprints.pdf');
  }
}
