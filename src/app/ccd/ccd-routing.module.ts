import { VideoCallComponent } from './video-call/video-call.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { PatientsLastLocationComponent } from './patients-last-location/patients-last-location.component';
import { PateintListComponent } from './pateint-list/pateint-list.component';
import { PaiteintentryComponent } from './paiteintentry/paiteintentry.component';
import { PatientStatusComponent } from './call-patient/patient-status.component';
import { HealthReportComponent } from './health-report/health-report.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const ccdRoutes: Routes = [
    {
        path: 'ccd',
        children: [
            {
                path: '',
                redirectTo: 'dashBoard',
                pathMatch: 'full'
            }, {
                path: 'dashBoard',
                component: DashBoardComponent
            }, {
                path: 'patientHealthReport',
                component: HealthReportComponent
            }, {
                path: 'controlRoom',
                component: PatientStatusComponent
            }, {
                path:"patiententry", component: PaiteintentryComponent
              }, {
                path:"patientList", component: PateintListComponent
              }, {
                  path: 'patientsLastLocation',
                  component: PatientsLastLocationComponent
              }, {
                path: 'videoCall',
                component: VideoCallComponent
              }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(ccdRoutes)],
  exports: [RouterModule]
})
export class CcdRoutingModule { }
