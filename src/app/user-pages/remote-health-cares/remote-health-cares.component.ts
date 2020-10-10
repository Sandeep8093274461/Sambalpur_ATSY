import { PatientService } from './../../patient.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-remote-health-cares',
  templateUrl: './remote-health-cares.component.html',
  styleUrls: ['./remote-health-cares.component.css']
})
export class RemoteHealthCaresComponent implements OnInit {

  entryForm: FormGroup;
  sessionValues: any;
  constructor(private service: PatientService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.sessionValues = {
      patientId: localStorage.getItem('patientId')
    }
    this.entryForm = new FormGroup({
      patientId: new FormControl(this.sessionValues.patientId, [Validators.required]),
      temerature: new FormControl('', [Validators.required]),
      oxySaturation: new FormControl('', [Validators.required]),
      oxyPulseRate: new FormControl('', [Validators.required]),
      bpSystolic: new FormControl('', [Validators.required]),
      bpDiastolic: new FormControl('', [Validators.required])
    })
  }
  addHealthInfo() {
    if(this.entryForm.valid) {
      this.service.addHealthInfo(this.entryForm.value).subscribe( result => {
        this.toastr.success(result.message)
        this.entryForm.patchValue({
          temerature: '',
          oxySaturation: '',
          oxyPulseRate: '',
          bpSystolic: '',
          bpDiastolic: ''
        })
      }, err => this.toastr.error('Error occurs.', err.status))
    } else {
      this.toastr.error('please enter valid input.')
    }
  }

}
