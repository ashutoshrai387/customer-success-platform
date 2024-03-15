import { Component,Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';

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
    console.log('Loading scopes');
    this.budgetService.getProjects(this.apiUrl).subscribe(
      (data) => {
        console.log('Project Scope:', data.items);
        this.budgets = data.items;
      },
      (error) => {
        console.log('Error fetching projects:', error);
      }
    );
  }

  addItem(projectId: string): void {
    let newItem = {projectId, Scope: '', 'Project Type': '','Duration (in months)': '','Budgeted Hours': '','Budget Currency': '','Budgeted Cost': '', editing: true};
    this.budgets.push(newItem);
    newItem = {projectId, Scope: '', 'Project Type': '','Duration (in months)': '','Budgeted Hours': '','Budget Currency': '','Budgeted Cost': '', editing: true}; // Clear newItem after adding
  }

  editItem(index: number): void {
    this.budgets[index].editing = true;
  }

  saveItem(index: number, id : string): void {
    const project = this.budgets[index];
    if (id) {
    console.log('Updating project with id:', id); 
      this.budgetService.updateProject(this.apiUrl, id, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error updating project:', error);
        }
      });
    } else {
      console.log('Adding project'); 
      this.budgetService.addProject(this.apiUrl, project).subscribe({
        next: () => {
          project.editing = false; // Exit editing mode
          this.loadProjects(); // Reload projects
        },
        error: (error) => {
          console.error('Error adding project:', error);
        }
      });
    }
    
  }

  deleteItem(index: number,id: string): void {
    console.log('Deleting project with id:', id); 
    const project = this.budgets[index];
    this.budgetService.deleteProject(this.apiUrl, id).subscribe(
      () => {
        this.budgets.splice(index, 1); // Remove project from projects array
        console.log('Project deleted:', project);
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting project:', error);
      }
    );
  }
}
