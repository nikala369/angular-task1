import { TokenInterceptorService } from './Services/token-interceptor.service';
import { AuthGuard } from './auth.guard';
import { EventService } from './Services/event.service';
import { TaskService } from './Services/task.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { MainContentComponent } from './Components/main-content/main-content.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { FirstSectionComponent } from './Components/Pages/institutions/first-section/first-section.component';
import { CreateInstComponent } from './Components/Pages/institutions/create-inst/create-inst.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { CreateBranchComponent } from './Components/Pages/institutions/create-branch/create-branch.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { CreatePersonalComponent } from './Components/Pages/institutions/create-personal/create-personal.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainContentComponent,
    routingComponents,
    FirstSectionComponent,
    CreateInstComponent,
    CreateBranchComponent,
    CreatePersonalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InputsModule,
    BrowserAnimationsModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GridModule,
    DropDownsModule,
  ],
  providers: [
    FirstSectionComponent,
    CreateInstComponent,
    TaskService,
    EventService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
