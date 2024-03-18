import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
selector: 'app-project-description',
templateUrl: './project-description.component.html',
styleUrls: ['./project-description.component.css']
})
export class ProjectDescriptionComponent {
projectId!: string;
projectName!: string;

constructor(private route: ActivatedRoute) {}

ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        this.projectId = params.get('projectId') as string;
        this.projectName = params.get('projectName') as string;
    });
}}