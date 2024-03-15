import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './components/project/project.component';
import { AuditHistoryComponent } from './components/audit-history/audit-history.component';
import { VersionHistoryComponent } from './components/version-history/version-history.component';
import { ProjectDescriptionComponent } from './components/project-description/project-description.component';
import { ScopeComponent } from './components/scope/scope.component';
import { ProjectStackComponent } from './components/project-stack/project-stack.component';
import { ProjectBudgetComponent } from './components/project-budget/project-budget.component';
import { StakeholdersComponent } from './components/stakeholders/stakeholders.component';
import { RiskProfilesComponent } from './components/risk-profiles/risk-profiles.component';
import { PhasesMilestonesComponent } from './components/phases-milestones/phases-milestones.component';
import { SprintComponent } from './components/sprint/sprint.component';
import { DetTimelineReferenceComponent } from './components/det-timeline-reference/det-timeline-reference.component';
import { ApprovedTeamsComponent } from './components/approved-teams/approved-teams.component';
import { ProjectResourcesComponent } from './components/project-resources/project-resources.component';
import { ClientFeedbackComponent } from './components/client-feedback/client-feedback.component';
import { ProjectUpdatesComponent } from './components/project-updates/project-updates.component';
import { MeetingMinutesComponent } from './components/meeting-minutes/meeting-minutes.component';
import { EscalationMatrixComponent } from './components/escalation-matrix/escalation-matrix.component';

const routes: Routes = [
  { path: '', component: ProjectComponent },
  { path: 'project', component:  ProjectComponent },
  { path: 'audithistory', component:  AuditHistoryComponent},
  { path: 'versionhistory', component:  VersionHistoryComponent},
  { path: 'projectdescription', component:  ProjectDescriptionComponent},
  { path: 'scope', component:  ScopeComponent},
  { path: 'projectstack', component:  ProjectStackComponent},
  { path: 'projectdescription/:projectId/:projectName', component: ProjectDescriptionComponent },
  { path: 'projectbudget/:projectId', component: ProjectBudgetComponent },
  { path: 'stakeholders/:projectId', component: StakeholdersComponent },
  { path: 'riskprofiles/:projectId', component: RiskProfilesComponent },
  { path: 'phases/:projectId', component: PhasesMilestonesComponent },
  { path: 'sprints/:projectId', component: SprintComponent },
  { path: 'detimeref/:projectId', component: DetTimelineReferenceComponent },
  { path: 'approvedteams/:projectId', component: ApprovedTeamsComponent },
  { path: 'projectresources/:projectId', component: ProjectResourcesComponent },
  { path: 'clientfeedback/:projectId', component: ClientFeedbackComponent },
  { path: 'projectupdates/:projectId', component: ProjectUpdatesComponent },
  { path: 'moms/:projectId', component: MeetingMinutesComponent },
  { path: 'escalationmatrix/:projectId', component: EscalationMatrixComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
