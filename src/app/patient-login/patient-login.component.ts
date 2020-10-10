import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as faceapi from 'face-api.js';
import { PatientService } from '../patient.service';


@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrls: ['./patient-login.component.css']
})
export class PatientLoginComponent implements OnInit {

  enterPatientID: string;
  storagePatientID: string;
  video: any;
  localstream: any;
  isFaceApiModelLoaded: boolean;
  isUserPicLoaded: boolean;
  interval: any;
  labeledFaceDescriptors: any;
  faceMatcher: any;
  canvas: any
  constructor(private toastr: ToastrService, private router: Router, private service: PatientService) { }

  ngOnInit(): void {
    localStorage.removeItem('patientId')
    this.video = document.getElementById('video')
    this.canvas = document.getElementById('canvas')
    this.storagePatientID = localStorage.getItem('patientId');
    this.startCamera();

    this.isFaceApiModelLoaded = false;
    this.isUserPicLoaded = false;
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('./assets/face-api/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('./assets/face-api/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('./assets/face-api/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('./assets/face-api/models')
  ]).then( async () => {
    if(this.storagePatientID) {
      this.loadPatientPictures(this.storagePatientID);
    }
    this.isFaceApiModelLoaded = true;
  });
    this.video.addEventListener('play', async () => {
      const displaySize = { width: this.video.offsetWidth, height: this.video.offsetHeight }
      faceapi.matchDimensions(this.canvas, displaySize);
      let count = 0;
      this.interval = setInterval(async () => {
          if(this.isFaceApiModelLoaded) {
                const detections = await faceapi.detectAllFaces(this.video, new faceapi.TinyFaceDetectorOptions())
                                          .withFaceLandmarks()
                                          .withFaceDescriptors()
                                          .withFaceExpressions();                              
                const resizeDetections = faceapi.resizeResults(detections, displaySize);
                this.canvas.getContext('2d').clearRect(0, 0, this.video.offsetWidth, this.video.offsetHeight);
                faceapi.draw.drawDetections(this.canvas, resizeDetections);
                faceapi.draw.drawFaceExpressions(this.canvas, resizeDetections);
                faceapi.draw.drawFaceLandmarks(this.canvas, resizeDetections);

                  if(this.isUserPicLoaded) {
                      const results = resizeDetections.map( (d: any) => {
                        return this.faceMatcher.findBestMatch(d.descriptor);
                      });
                      results.forEach( (element: any) => {
                          if (element._label != "unknown") {
                              count++
                              return
                          }
                      })
                      if (count > 0) {
                          this.router.navigate(['/patientDashboard'])
                          this.stopCamera();
                      }
                  }
          }
      }, 1500)
    })
  }
  async loadPatientPictures(ID: string) {
    this.labeledFaceDescriptors = await this.loadLabeledImagesFromInbox(ID);
    this.faceMatcher = new faceapi.FaceMatcher(this.labeledFaceDescriptors, 0.6);
    this.isUserPicLoaded = true;
  }
  loadLabeledImagesFromInbox(ID: string) {
    const labels = [`patientId_${ID}_1`, `patientId_${ID}_2`, `patientId_${ID}_3`];
    return Promise.all(
        labels.map(async label => {
            const descriptions = [];
            for (let i = 1; i <= 3; i++) {
                const img = await faceapi.fetchImage(`/patientsPic/patientId_${ID}_${i}.jpg`);
                var detections = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
                                              .withFaceLandmarks()
                                              .withFaceDescriptor()
                                              .withFaceExpressions();
                descriptions.push(detections.descriptor)
            }
            return new faceapi.LabeledFaceDescriptors(label, descriptions)
        })
    )
  }

  setPatientId() {
    if(this.enterPatientID) {
      this.service.checkPatientIdExistance(this.enterPatientID).subscribe( result => {
        if(result) {
          localStorage.setItem('patientId', this.enterPatientID)
          this.storagePatientID = localStorage.getItem('patientId')
          this.loadPatientPictures(this.storagePatientID)
        } else {
          this.toastr.error('Sorry, ID not registred. Try again with registred ID.')
          this.enterPatientID = ''
        }
      }, error => this.toastr.error(error.error.message, error.status))
    } else {
      this.toastr.error('Enter ID please')
    }
  }

  startCamera() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      const constraints = {
        video: {
          facingMode: "environment",
          width: { ideal: 320 },
          height: { ideal: 320 }
        }
      };
      navigator.mediaDevices.getUserMedia(constraints).then( (stream: any ) => {
        this.localstream = stream;
        this.video.srcObject = stream
      }).catch(error => this.toastr.error(error, 'Camera error.'));
    } else {
      this.toastr.error('Sorry, Camera not found.');
    }
  }
  stopCamera() {
    this.video.src = "";
    this.video.pause();
    this.localstream.getTracks()[0].stop();
    setTimeout(() => {
        clearInterval(this.interval);
    }, 1550)
  }
}
