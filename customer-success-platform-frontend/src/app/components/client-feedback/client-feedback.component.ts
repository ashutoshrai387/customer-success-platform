import { Component, Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-client-feedback',
  templateUrl: './client-feedback.component.html',
  styleUrl: './client-feedback.component.css'
})
export class ClientFeedbackComponent {
  @Input() projectId!: string;

    private apiUrl = 'https://localhost:44347/api/app/client-feedback';
    feedbacks: any[] = [];
    
    constructor(private clientFeedbackService: CustomerSuccessService) { }

    ngOnInit(): void {
      this.loadProjects();
    }
  
    loadProjects(): void {
      console.log('Loading client feedbacks :', this.projectId);
      this.clientFeedbackService.getProjects(this.apiUrl).subscribe(
        (data) => {
          console.log('client feedbacks:', data.items);
          this.feedbacks = data.items;
        },
        (error) => {
          console.log('Error fetching client feedbacks:', error);
        }
      );
    }
  
    addItem(projectId: string): void {
      console.log('Adding client feedback :',projectId);
      let newItem = {projectId, 'Feedback Type': '', 'Date Received': '','Detailed Feedback': '', 'Action Taken': '','Closure Date': '', editing: true};
      this.feedbacks.push(newItem);
      newItem = {projectId, 'Feedback Type': '', 'Date Received': '','Detailed Feedback': '', 'Action Taken': '','Closure Date': '', editing: true}; // Clear newItem after adding
    }

    cancelItem(index: number, Id: string): void {
      const project = this.feedbacks[index];
      if (Id) {
        project.editing = false; // Exit editing mode
      } else {
        this.feedbacks.splice(index, 1); // Remove project from projects array
      }
    }
  
    editItem(index: number): void {
      this.feedbacks[index].editing = true;
    }
  
    saveItem(index: number, id : string): void {
      console.log('test',index,id);
      const project = this.feedbacks[index];
      console.log(project);
      if (id) {
      console.log('Updating client feedback with id:', id); 
        this.clientFeedbackService.updateProject(this.apiUrl, id, project).subscribe({
          next: () => {
            project.editing = false; // Exit editing mode
            this.loadProjects(); // Reload projects
          },
          error: (error) => {
            console.error('Error updating client feedback:', error);
          }
        });
      } else {
        console.log('Adding client feedback'); 
        this.clientFeedbackService.addProject(this.apiUrl, project).subscribe({
          next: () => {
            project.editing = false; // Exit editing mode
            this.loadProjects(); // Reload projects
          },
          error: (error) => {
            console.error('Error adding client feedback:', error);
          }
        });
      }
      
    }
  
    deleteItem(index: number,id: string): void {
      console.log('Deleting client feedback with id:', id); 
      const project = this.feedbacks[index];
      this.clientFeedbackService.deleteProject(this.apiUrl, id).subscribe(
        () => {
          this.feedbacks.splice(index, 1); // Remove project from projects array
          console.log('client feedback deleted:', project);
          this.loadProjects();
        },
        (error) => {
          console.error('Error deleting client feedback:', error);
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
    
      const heading = 'Client Feedback'; // Heading text
      const columnsToInclude = ['Feedback Type', 'Date Received', 'Detailed Feedback', 'Action Taken', 'Closure Date']; // Columns to include
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
      pdf.save('ClientFeedback.pdf');
    }
}
