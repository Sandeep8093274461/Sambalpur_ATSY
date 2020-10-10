import { ViewpageComponent } from './user-pages/viewpage/viewpage.component';
import { RemoteHealthCaresComponent } from './user-pages/remote-health-cares/remote-health-cares.component';
import { AuthService } from './auth.service';
import { RrtModule } from './rrt/rrt.module';
import { CcdModule } from './ccd/ccd.module';
import { PatientfeedbackComponent } from './patientfeedback/patientfeedback.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AdminModule } from './admin/admin.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent} from './header/header.component';
import { FooterComponent} from './footer/footer.component'
import { SidebarComponent} from './sidebar/sidebar.component'
import { PatientService } from './patient.service';
import { HttpClientModule } from '@angular/common/http';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { DashboardComponent } from './user-pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PatientfeedbackComponent,
    ViewpageComponent,
    RemoteHealthCaresComponent,
    PatientLoginComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AdminModule,
    LeafletModule,
    CcdModule,
    RrtModule
    
  ],
  providers: [PatientService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
