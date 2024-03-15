import { Component,Input } from '@angular/core';
import { CustomerSuccessService } from '../../services/customer-success.service';

@Component({
  selector: 'app-project-stack',
  templateUrl: './project-stack.component.html',
  styleUrl: './project-stack.component.css'
})
export class ProjectStackComponent {
  @Input() projectId!: string;
  apiUrl: string = 'https://localhost:44347/api/app/project-stack';
  projectStacks: any[] = [];
  

  constructor(private projectStackService: CustomerSuccessService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    console.log('Loading stacks');
    this.projectStackService.getProjects(this.apiUrl).subscribe(
      (data) => {
        console.log('value: ', data.items);
          console.log('Project Stacks:', data.items);
          this.projectStacks = data.items;
      },
      (error) => {
        console.log('Error fetching projects:', error);
      }
    );
  }

  addItem(projectId: string): void {
    let newItem = {projectId, Name: '', editing: true};
    this.projectStacks.push(newItem);
    newItem = {projectId, Name: '', editing: true}; 
  }

  editItem(index: number): void {
    this.projectStacks[index].editing = true;
  }

  saveItem(index: number, id : string): void {
    const project = this.projectStacks[index];
    if (id) {
    console.log('Updating project with id:', id); 
      this.projectStackService.updateProject(this.apiUrl, id, project).subscribe({
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
      this.projectStackService.addProject(this.apiUrl, project).subscribe({
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
    const project = this.projectStacks[index];
    this.projectStackService.deleteProject(this.apiUrl, id).subscribe(
      () => {
        this.projectStacks.splice(index, 1); // Remove project from projects array
        console.log('Project deleted:', project);
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting project:', error);
      }
    );
  }
}
