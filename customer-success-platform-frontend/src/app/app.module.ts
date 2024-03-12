import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { RouterModule } from '@angular/router';
// import { RouterTestingModule } from "@angular/router/testing";
import { ProjectComponent } from './components/project/project.component';
import { CustomerSuccessService } from './services/customer-success.service';
import { AuditHistoryComponent } from './components/audit-history/audit-history.component';
import { VersionHistoryComponent } from './components/version-history/version-history.component';
import { ProjectDescriptionComponent } from './components/project-description/project-description.component';
import { ScopeComponent } from './components/scope/scope.component';
import { ProjectStackComponent } from './components/project-stack/project-stack.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    AuditHistoryComponent,
    VersionHistoryComponent,
    ProjectDescriptionComponent,
    ScopeComponent,
    ProjectStackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // RouterModule,
    // RouterTestingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration(),
    CustomerSuccessService,
    // RouterModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
