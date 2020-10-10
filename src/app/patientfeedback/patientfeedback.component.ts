import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patientfeedback',
  templateUrl: './patientfeedback.component.html',
  styleUrls: ['./patientfeedback.component.css']
})
export class PatientfeedbackComponent implements OnInit {
  feedBackForm: FormGroup
  constructor(private service: PatientService) { }

  ngOnInit(): void {
    this.feedBackForm = new FormGroup({
      rrTeamvisited: new FormControl('', Validators.required),
      dateOfVisit: new FormControl(''),
      timeOfVisit: new FormControl(''),
      systolic: new FormControl('', Validators.required),
      diastolic: new FormControl('', Validators.required),
      thermomrterDataIncel: new FormControl('', Validators.required),
      thermomrterDataInfahren: new FormControl('', Validators.required),
      oxygenSaturation: new FormControl('', Validators.required),
      pulseRate: new FormControl('', Validators.required),
      feedback: new FormControl('', Validators.required),
     

    })
  }
  addpatientDetils() {
    if (this.feedBackForm.valid) {
      this.service.addPatientData(this.feedBackForm.value).subscribe(result => {
        console.log('sucess', result);
        alert('Data added succefully.')
        this.feedBackForm.patchValue(
          {
            rrTeamvisited: '',
            dateOfVisit: '',
            timeOfVisit: '',
            systolic: '',
            diastolic: '',
            thermomrterDataIncel: '',
            thermomrterDataInfahren: '',
            oxygenSaturation: '',
            pulseRate: '',
            feedback: ''
            
          })
      },
        error => console.error('Error', error)

      );

    }
    else {
      alert("valid input")
    }


  }

}
