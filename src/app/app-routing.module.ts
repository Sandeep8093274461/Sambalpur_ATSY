import { ViewpageComponent } from './user-pages/viewpage/viewpage.component';
import { RemoteHealthCaresComponent } from './user-pages/remote-health-cares/remote-health-cares.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './user-pages/dashboard/dashboard.component';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { PatientfeedbackComponent } from './patientfeedback/patientfeedback.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [ 
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }, {
    path:"patientFeedback", component: PatientfeedbackComponent
  }, {
    path:"viewPage",component: ViewpageComponent
  }, {
    path: 'remoteHealthCares',
    component: RemoteHealthCaresComponent
  }, {
    path: 'patientLogin',
    component: PatientLoginComponent
  }, {
    path: 'patientDashboard',
    component: DashboardComponent
  }, {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }