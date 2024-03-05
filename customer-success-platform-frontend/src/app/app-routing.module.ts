// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProjectComponent } from './components/project/project.component';
// import { Component2Component } from './component2/component2.component';

const routes: Routes = [
  {
    path: 'navigation',
    component: NavigationComponent,
    children: [
      { path: './components/project/project.component', component: ProjectComponent },
      // { path: 'component2', component: Component2Component },
      // Add more routes as needed
      { path: '', redirectTo: './components/project/project.component', pathMatch: 'full' } // Default route within navigation
    ]
  },
  { path: '', redirectTo: 'navigation', pathMatch: 'full' },
  { path: '**', redirectTo: 'navigation' } // Handle 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
