import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { ProjectComponent } from './components/project/project.component';
import { ProjectService } from './services/project.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
