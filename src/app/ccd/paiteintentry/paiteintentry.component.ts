import { PatientService } from './../../patient.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-paiteintentry',
  templateUrl: './paiteintentry.component.html',
  styleUrls: ['./paiteintentry.component.css']
})
export class PaiteintentryComponent implements OnInit {
  patientEntryForm: FormGroup
  kitEntryForm: FormGroup
  data: any;
  selectedFile: any;
  xlFile: any
  role: string;
  blockList:any;
  constructor(private service: PatientService, private toastr: ToastrService) {
  }


  ngOnInit(): void {
    this.data = [];
    this.xlFile = document.getElementById('xlSheet')


    

    this.patientEntryForm = new FormGroup({
      patientId: new FormControl(''),
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
      kit: new FormControl('', Validators.required),
      symptoms: new FormControl('', Validators.required),
      covid: new FormControl('', Validators.required),
      isolationCompleteDate: new FormControl('', Validators.required),
      remark: new FormControl(''),

    })
    this.kitEntryForm = new FormGroup({
      excelFile: new FormControl(''),
      yes: new FormControl('', Validators.required),
      excelsheetFile: new FormControl('', Validators.required)


    })
    this.service.getBlockList().subscribe((result) => {
      this.blockList = JSON.parse(JSON.stringify(result))
    });
  }
  importData() {
    if (this.kitEntryForm.valid) {
      if (this.selectedFile) {
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {

          const data: string = e.target.result;
          const workBook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });

          const wsname: string = workBook.SheetNames[0];
          const ws: XLSX.WorkSheet = workBook.Sheets[wsname];
          let sheetData = XLSX.utils.sheet_to_json(workBook.Sheets[wsname])
          this.data = sheetData
         
         
         console.log(this.data)
          this.service.addExcelDataData(this.data).subscribe(result => {
            console.log('sucess', result);
            alert('Data added succefully.')
            this.kitEntryForm.patchValue(
              {
                yes: '',
                excelsheetFile: '',
               

              })

          },
            error => console.error('Error', error)

          );


        };
        reader.readAsBinaryString(this.selectedFile);
      } else {
        alert('Please select a file first')
      }
    }
    else {
      alert('Please filled-up mandatoryfileds')
    }
  }
  onFileChange(event: any) {
    if (event.target.files[0] != undefined) {
      if (event.target.files[0].type === 'application/vnd.ms-excel' || event.target.files[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        this.selectedFile = event.target.files[0];
      } else {
        alert('Please upload only .xls or .xlsx file.');
        this.xlFile.value = null;
      }
    }
  }

  addpatientDetils() {
    if (this.patientEntryForm.valid) {
      this.service.addPatientData(this.patientEntryForm.value).subscribe(result => {
        this.toastr.success(result.message)
        this.patientEntryForm.patchValue( {
            patientId: '',
            id: '',
            srfId: '',
            patientName: '',
            age: '',
            gender: '',
            mobileno: '',
            type: '',
            sift: '',
            plot: '',
            block: '',
            isolationCompleteDate:'',
            symptoms: '',
            covid: '',
            kit: '',
            remark: ''
          })
      }, error => this.toastr.error(error.error.message, error.status)  );
    }
    else {
      this.toastr.error('Please enter valid inputs.')
    }


  }

}
