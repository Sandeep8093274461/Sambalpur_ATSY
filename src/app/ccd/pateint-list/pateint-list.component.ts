import { ToastrService } from 'ngx-toastr';
import { PatientService } from './../../patient.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-pateint-list',
  templateUrl: './pateint-list.component.html',
  styleUrls: ['./pateint-list.component.css']
})
export class PateintListComponent implements OnInit {
  patientEntryForm: FormGroup
  Patientdata: any;
  viewDetail: any;
  div1: boolean = true;
  div2: boolean = false;
  blockList: any;

  constructor(
    private view: PatientService,
    private toastr: ToastrService) { }
  div1Function() {
    this.div1 = true;
    this.div2 = false;
  }




  ngOnInit(): void {
    this.patientEntryForm = new FormGroup({
      patientId: new FormControl('', Validators.required),
      id: new FormControl(''),
      srfId: new FormControl(''),
      patientName: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      mobileno: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      sift: new FormControl('', Validators.required),
      plot: new FormControl('', Validators.required),
      block: new FormControl('', Validators.required),
      symptoms: new FormControl('', Validators.required),
      covid: new FormControl('', Validators.required),
      kit: new FormControl(''),
      remark: new FormControl(''),
      isolationCompleteDate: new FormControl('', [Validators.required])

    })
    this.view.getPatientList().subscribe((result) => {
      this.Patientdata = JSON.parse(JSON.stringify(result))
    });
    this.viewDetail = {};
  }
  alldataShow() {
    this.view.getPatientList().subscribe((result) => {
      this.Patientdata = JSON.parse(JSON.stringify(result))
    });
    this.viewDetail = {};
  }
  viewEditDetail(x: any) {
    this.viewDetail = x;
    this.view.getBlockList().subscribe((result) => {
      this.blockList = JSON.parse(JSON.stringify(result))
    }, error => this.toastr.error(`Can not load Block list.`, error.status));

    this.patientEntryForm.setValue({

      patientId: this.viewDetail.patientId,
      id: this.viewDetail.id,
      srfId: this.viewDetail.srfId,
      patientName: this.viewDetail.patientName,
      age: this.viewDetail.age,
      gender: this.viewDetail.gender,
      mobileno: this.viewDetail.mobileno,
      type: this.viewDetail.type,
      sift: this.viewDetail.sift,
      plot: this.viewDetail.plot,
      block: this.viewDetail.block,
      isolationCompleteDate: this.viewDetail.isolationCompleteDate,
      symptoms: this.viewDetail.symptoms,
      covid: this.viewDetail.covid,
      kit: this.viewDetail.kit,
      remark: this.viewDetail.remark

    })

  }
  viewDeleteDetail(x) {
    this.viewDetail = x;
  }
  back() {
    this.div1 = true;
    this.div2 = false;
  }
  viewPatientsDetail(x) {
    this.viewDetail = x;
    this.div2 = true;
    this.div1 = false;
  }

  editdata() {
    this.view.updatePatientData(this.viewDetail.patientSNo, this.patientEntryForm.value).subscribe(result => {
      this.alldataShow();
      this.toastr.success(result.message)

    }, error => this.toastr.error(error.error.message, error.status));
  }
  delete(patientSNo: any ) {
    this.view.deletePatientData(patientSNo).subscribe(result => {
      this.alldataShow();
      this.toastr.success(result.message)
    }, error => this.toastr.error(error.error.message, error.status));
  }

}
