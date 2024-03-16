import { Component,Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-project-budget',
  templateUrl: './project-budget.component.html',
  styleUrl: './project-budget.component.css'
})
export class ProjectBudgetComponent {
  @Input() projectId!: string;
  apiUrl: string = 'https://localhost:44347/api/app/project-budget';
  budgets: any[] = [];
  

  constructor(private budgetService: CustomerSuccessService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    console.log('Loading budgets');
    this.budgetService.getProjects(this.apiUrl).subscribe(
      (data) => {
        console.log('Project budgets:', data.items);
        this.budgets = data.items;
      },
      (error) => {
        console.log('Error fetching budgets:', error);
      }
    );
  }

  addItem(projectId: string): void {
    let newItem = {projectId, Scope: '', 'Project Type': '','Duration (in months)': '','Budgeted Hours': '','Budget Currency': '','Budgeted Cost': '', editing: true};
    this.budgets.push(newItem);
    newItem = {projectId, Scope: '', 'Project Type': '','Duration (in months)': '','Budgeted Hours': '','Budget Currency': '','Budgeted Cost': '', editing: true}; // Clear newItem after adding
  }

  cancelItem(index: number, Id: string): void {
    const project = this.budgets[index];
    if (Id) {
      project.editing = false; // Exit editing mode
    } else {
      this.budgets.splice(index, 1); // Remove project from projects array
    }
  }

  editItem(index: number): void {
    this.budgets[index].editing = true;
  }

  saveItem(index: number, id : string): void {
    const project = this.budgets[index];
    if (id) {
    console.log('Updating budgets with id:', id); 
      this.budgetService.updateProject(this.apiUrl, id, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error updating budgets:', error);
        }
      });
    } else {
      console.log('Adding budgets'); 
      this.budgetService.addProject(this.apiUrl, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error adding budgets:', error);
        }
      });
    }
    
  }

  deleteItem(index: number,id: string): void {
    console.log('Deleting budgets with id:', id); 
    const project = this.budgets[index];
    this.budgetService.deleteProject(this.apiUrl, id).subscribe(
      () => {
        this.budgets.splice(index, 1); // Remove project from projects array
        console.log('budgets deleted:', project);
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting budgets:', error);
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
  
    const heading = 'Project Budget'; // Heading text
    const columnsToInclude = ['Project Type','Duration (in months)','Budgeted Hours','Budget Currency','Budgeted Cost']; // Columns to include
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
    pdf.save('ProjectBudget.pdf');
  }
}
