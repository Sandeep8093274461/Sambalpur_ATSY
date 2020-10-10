import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/patient.service';

@Component({
  selector: 'app-isolationactive-case',
  templateUrl: './isolationactive-case.component.html',
  styleUrls: ['./isolationactive-case.component.css']
})
export class IsolationactiveCaseComponent implements OnInit {
  allPatientList: any;
  deathData: any;
  isolationData: any;
  hospitalizeData: any;
  totalNoOfpatients:any;
  count: any;
  div1: boolean = true;
  div2: boolean = false;
  constructor(private view: PatientService) { }

  ngOnInit(): void {
    this.loadAllPaitientsIsolationWise();
  }
  loadAllPaitientsIsolationWise() {

    this.view.loadAllPaitientsList().subscribe((result) => {
      this.allPatientList = result;
      this.allPatientList.forEach(element => {
        
        if (element.statusOfPatient == 'isolation') {
          this.isolationData = element.count;

        }
        else if (element.statusOfPatient == 'death') {
          this.deathData = element.count;
        }
        else if (element.statusOfPatient == 'hospitalize') {
          this.hospitalizeData = element.count;
        }
       
      })
      if( this.isolationData == undefined)
      {
        this.isolationData =0;
      }
      if( this.hospitalizeData == undefined)
      {
        this.hospitalizeData =0;
      }
      if( this.deathData == undefined)
      {
        this.deathData =0;
      }
      this.totalNoOfpatients = this.hospitalizeData + this.deathData +this.isolationData;

    });
  }
  pickedUp(){
    console.log("hii")
    this.div1 =false ;
    this.div2 = true;

  }
}
