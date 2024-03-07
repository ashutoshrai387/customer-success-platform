import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import { ProjectComponent } from './components/project/project.component';
import { ProjectService } from './services/project.service';
import { AuditHistoryComponent } from './components/audit-history/audit-history.component';
import { AuditHistoryService } from './services/audithistory.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ProjectComponent,
    AuditHistoryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RouterTestingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration(),
    ProjectService,
    AuditHistoryService,
    RouterModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
