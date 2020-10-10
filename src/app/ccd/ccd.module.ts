import { PiechartForMaleFemaleComponent } from './chart/piechart-for-male-female/piechart-for-male-female.component';
import { PiechartComponent } from './chart/piechart/piechart.component';
import { PiechartAgeWiseComponent } from './chart/piechart-age-wise/piechart-age-wise.component';
import { KitgivenchartComponent } from './chart/kitgivenchart/kitgivenchart.component';
import { IsolationactiveCaseComponent } from './chart/isolationactive-case/isolationactive-case.component';
import { CovidwarriorComponent } from './chart/covidwarrior/covidwarrior.component';
import { ChatCallHistoryComponent } from './chart/chat-call-history/chat-call-history.component';
import { AgewisemalefemaleComponent } from './chart/agewisemalefemale/agewisemalefemale.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { PateintListComponent } from './pateint-list/pateint-list.component';
import { PaiteintentryComponent } from './paiteintentry/paiteintentry.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientStatusComponent } from './call-patient/patient-status.component';
import { NgxPrintModule } from 'ngx-print';
import { NgxPaginationModule } from 'ngx-pagination';
import { CcdService } from './ccd.service';
import { CcdRoutingModule } from './ccd-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthReportComponent } from './health-report/health-report.component';
import { CcdSidebarComponent } from './ccd-sidebar/ccd-sidebar.component';
import { CcdHeaderComponent } from './ccd-header/ccd-header.component';
import { CcdFooterComponent } from './ccd-footer/ccd-footer.component';
import { PatientsLastLocationComponent } from './patients-last-location/patients-last-location.component';
import { VideoCallComponent } from './video-call/video-call.component';
import { ZonePatientLocationComponent } from './chart/zone-patient-location/zone-patient-location.component';



@NgModule({
  declarations: [HealthReportComponent, 
    CcdSidebarComponent, 
    CcdHeaderComponent, 
    CcdFooterComponent, 
    PatientStatusComponent, 
    PaiteintentryComponent,
    PateintListComponent,
    PatientsLastLocationComponent,
    DashBoardComponent,
    AgewisemalefemaleComponent,
    ChatCallHistoryComponent,
    CovidwarriorComponent,
    IsolationactiveCaseComponent,
    KitgivenchartComponent,
    PiechartComponent,
    PiechartAgeWiseComponent,
    PiechartForMaleFemaleComponent,
    VideoCallComponent,
    ZonePatientLocationComponent
  ],
  imports: [
    CommonModule,
    CcdRoutingModule,
    NgxPaginationModule,
    NgxPrintModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CcdService]
})
export class CcdModule { }
