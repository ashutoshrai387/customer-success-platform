import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './components/project/project.component';
import { AuditHistoryComponent } from './components/audit-history/audit-history.component';
import { VersionHistoryComponent } from './components/version-history/version-history.component';
import { ProjectDescriptionComponent } from './components/project-description/project-description.component';
import { ScopeComponent } from './components/scope/scope.component';
import { ProjectStackComponent } from './components/project-stack/project-stack.component';

export const routes: Routes = [
  { path: '/', component: ProjectComponent },
  { path: 'project', component:  ProjectComponent },
  { path: 'audithistory', component:  AuditHistoryComponent},
  { path: 'versionhistory', component:  VersionHistoryComponent},
  { path: 'projectdescription', component:  ProjectDescriptionComponent},
  { path: 'scope', component:  ScopeComponent},
  { path: 'projectstack', component:  ProjectStackComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
