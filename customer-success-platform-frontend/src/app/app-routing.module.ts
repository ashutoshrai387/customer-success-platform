// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './components/project/project.component';
import { NavigationComponent } from './components/navigation/navigation.component';

export const routes: Routes = [
  { path: '', component: NavigationComponent ,
      children: [
    { path: '', component:  ProjectComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
