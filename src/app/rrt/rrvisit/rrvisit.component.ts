import { RrtService } from './../rrt.service';
import { PatientService } from './../../patient.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-rrvisit',
  templateUrl: './rrvisit.component.html',
  styleUrls: ['./rrvisit.component.css']
})
export class RrvisitComponent implements OnInit {
  slectedFile:File = null; 
  @ViewChild('video', { static: true }) videoElement: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  rrvisitEntryFrom: FormGroup
  patientList: any;
  viewDetail: any;
  blogData :any;
  div0: boolean = true
  div1: boolean = false;
  div2: boolean = false;
  div3: boolean = false;
  div4: boolean = false;
  divPList: boolean = false;
  status: string;
  searchForm: FormGroup
  patientUnavailableForm: FormGroup
  localstream: any
  interval: any
  zoneList: any


  constructor(
    private view: PatientService, 
    private renderer: Renderer2, 
    private toastr: ToastrService,
    private service: RrtService ) { }
  div1Function() {
    this.div1 = true;
    this.div2 = false;
    this.div3 = false;
    this.div4 = false;
  }

  ngOnInit(): void {
    this.zoneList = []
    this.patientList = []
    this.loadForms()
    this.viewDetail = {};
  }

  back() {
    this.div0 = false;
    this.div1 = false;
    this.div2 = false;
    this.div3 = false;
    this.div4 = false;
    this.divPList = true;
  }
  gotoPage1() {
    this.div0 = false;
    this.div1 = true;
    this.div2 = false;
    this.div3 = false;
    this.div4 = false;
    this.divPList = false;
  }
  viewPatientsDetail(x: object) {
    this.viewDetail = x;
    this.div2 = true;
    this.div1 = false;
    this.div3 = false;
    this.div4 = false;
    this.divPList = false;

    this.rrvisitEntryFrom.patchValue({
      patientId: this.viewDetail.patientId,
      patientName: this.viewDetail.patientName
    })
    this.patientUnavailableForm.patchValue({
      patientId: this.viewDetail.patientId,
      patientName: this.viewDetail.patientName
    })
  }
  notavailable() {
    this.rrvisitEntryFrom.patchValue({
        dateOfrrVisit: '',
        timeOfrrVisit: '',
        healthStatusOfrrVisit: '',
        pictureOfrrVisit: '',
        statupictureOfrrVisitsOfHealth: '',
        remarkOfrrVisit: ''
      })

    this.div2 = true;
    this.div1 = false;
    this.div3 = false;
    this.div4 = true;
    this.status = 'not available'

  }
  available() {
    this.div2 = true;
    this.div1 = false;
    this.div3 = true;
    this.div4 = false;
    this.rrvisitEntryFrom.patchValue(
      {
        dateOfrrVisit: '',
        timeOfrrVisit: '',
        healthStatusOfrrVisit: '',
        pictureOfrrVisit: '',
        statupictureOfrrVisitsOfHealth: '',
        remarkOfrrVisit: ''
      })
    this.status = 'available'
  }

  async rrvisitSubmit() {
    this.blogData = await new Promise(resolve => this.canvas.nativeElement.toBlob(resolve, 'image/png'));
    var newFormData = new FormData();
    newFormData.append(`patientPic`,  this.blogData, `patientId_${this.rrvisitEntryFrom.value.patientId}_`);
    let data = this.rrvisitEntryFrom.value
    newFormData.append('value', JSON.stringify(data));
    if (this.rrvisitEntryFrom.valid) {
      this.view.rrVistiData(newFormData).subscribe(result => {
        this.toastr.success(result.message)
        this.div1Function();
        this.loadPatientList(this.rrvisitEntryFrom.value)
        this.back()
        this.rrvisitEntryFrom.patchValue({
          healthStatusOfrrVisit: new FormControl('', Validators.required),
          temperature: '',
          oxySaturation: '',
          oxyPulse: '',
          bpUpper: '',
          bpLower: '',
          remarkOfrrVisit: '',
          latitude: 0,
          longitude: 0,
        })
      }, error => console.error('Error', error)  );
  
    }
    else {
      alert('Please filled-up mandatory fields')
    }
   
  }
  constraints = {
    video: {
      facingMode: "environment",
      width: { ideal: 220 },
      height: { ideal: 220 }
    }
  };
  startCamera() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
    } else {
      alert('Sorry, camera not available.');
    }
  }
  handleError(error: any) {
    console.log('Error: ', error);
  }
  videoWidth = 0;
  videoHeight = 0;
  attachVideo(stream: any) {
    this.localstream = stream;
    this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
    this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
      this.videoHeight = this.videoElement.nativeElement.videoHeight;
      this.videoWidth = this.videoElement.nativeElement.videoWidth;
    });
  }
  capture() {
    this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
    this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
    this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
    
  }




  loadForms() {
    this.rrvisitEntryFrom = new FormGroup({
      rrtCode: new FormControl('', [Validators.required]),
      zone: new FormControl('', [Validators.required]),
      patientId: new FormControl('', [Validators.required]),
      patientName: new FormControl('', [Validators.required]),
      healthStatusOfrrVisit: new FormControl('', Validators.required),
      temperature: new FormControl('', Validators.required),
      oxySaturation: new FormControl('', Validators.required),
      oxyPulse: new FormControl('', Validators.required),
      bpUpper: new FormControl('', Validators.required),
      bpLower: new FormControl('', Validators.required),
      remarkOfrrVisit: new FormControl('', Validators.required),
      latitude: new FormControl('', Validators.required),
      longitude: new FormControl('', Validators.required)
    })
    this.searchForm = new FormGroup({
      rrtCode: new FormControl('rrt1', [Validators.required]),
      pin: new FormControl('123', [Validators.required])
    })
    this.patientUnavailableForm = new FormGroup({
      rrtCode: new FormControl('', [Validators.required]),
      zone: new FormControl('', [Validators.required]),
      patientId: new FormControl('', [Validators.required]),
      patientName: new FormControl('', [Validators.required]),
      remark: new FormControl('', [Validators.required])
    })
    this.addGeoLocation()
  }
  searchZoneList() {
    if(this.searchForm.valid) {
      this.service.validateRrtAndGetZoneList(this.searchForm.value).subscribe((result) => {
        this.gotoPage1()
        this.zoneList = result.zoneList
        this.patientUnavailableForm.patchValue({
          rrtCode: this.searchForm.value.rrtCode,
          zone: this.searchForm.value.zone
        })
        this.rrvisitEntryFrom.patchValue({
          rrtCode: this.searchForm.value.rrtCode,
          zone: this.searchForm.value.zone
        })
      }, error => this.toastr.error(error.error.message, error.status));
    } else {
      this.toastr.error('Please enter valid input.')
    }    
  }
  loadPatientList(x: any) {
      this.service.getRrtZoneWisePatientList(this.searchForm.value.rrtCode, x.zoneId).subscribe((result) => {
        this.patientList = result.patientList
        this.back()
      }, error => this.toastr.error(error.error.message, error.status));
  }
  patientUnavailable() {
    if(this.patientUnavailableForm.valid) {
      this.view.addPatientUnavailable(this.patientUnavailableForm.value).subscribe((result) => {
        this.toastr.success(result.message)
        this.back();
        this.patientUnavailableForm.patchValue({
          remark: ''
        })
      });
    } else {
      this.toastr.error('Please enter valid input.')
    }
  }
  stopCamera() {
    this.localstream.getTracks()[0].stop();
  }
  addGeoLocation() {
    this.rrvisitEntryFrom.patchValue({
      latitude: 20.286251,
      longitude: 85.858002
    })
  }
}