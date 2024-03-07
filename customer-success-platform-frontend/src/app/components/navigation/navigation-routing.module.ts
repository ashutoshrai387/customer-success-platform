import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from '../project/project.component';
import { AuditHistoryComponent } from '../audit-history/audit-history.component';

export const routes: Routes = [
  { path: '', component: ProjectComponent },
  { path: 'project', component:  ProjectComponent },
  { path: 'audithistory', component:  AuditHistoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }