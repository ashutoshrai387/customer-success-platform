import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectComponent } from './components/project/project.component';
import { CustomerSuccessService } from './services/customer-success.service';
import { AuditHistoryComponent } from './components/audit-history/audit-history.component';
import { VersionHistoryComponent } from './components/version-history/version-history.component';
import { ProjectDescriptionComponent } from './components/project-description/project-description.component';
import { ScopeComponent } from './components/scope/scope.component';
import { ProjectStackComponent } from './components/project-stack/project-stack.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatTabsModule} from '@angular/material/tabs';
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

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    AuditHistoryComponent,
    VersionHistoryComponent,
    ProjectDescriptionComponent,
    ScopeComponent,
    ProjectStackComponent,
    ProjectBudgetComponent,
    StakeholdersComponent,
    RiskProfilesComponent,
    PhasesMilestonesComponent,
    SprintComponent,
    DetTimelineReferenceComponent,
    ApprovedTeamsComponent,
    ProjectResourcesComponent,
    ClientFeedbackComponent,
    ProjectUpdatesComponent,
    MeetingMinutesComponent,
    EscalationMatrixComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTabsModule
  ],
  providers: [
    provideClientHydration(),
    CustomerSuccessService,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
