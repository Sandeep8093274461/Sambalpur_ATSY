import { ToastrService } from 'ngx-toastr';
import { CcdService } from './../ccd.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-health-report',
  templateUrl: './health-report.component.html',
  styleUrls: ['./health-report.component.css']
})
export class HealthReportComponent implements OnInit {

  feedbackList: any;
  healthInfoList: any;
  rrtVisitList: any;
  feedbackPage: number;
  healthInfoPage: number
  rrtVistPage: number
  x: any

  map: any;
  polygon: any;
  polygonPoints: any;
  layerGroup: any;
  constructor(private route: ActivatedRoute, private service: CcdService, private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.feedbackList = [];
    this.healthInfoList = [];
    this.rrtVisitList = [];
    this.feedbackPage = 1
    this.healthInfoPage = 1
    this.rrtVistPage = 1
    this.x = {}
    this.loadMap()
    this.route.queryParams.subscribe( data => {
      this.loadPatientHealthDetail(data.patientId);
    })
  }
  loadPatientHealthDetail(patientId: string) {
    this.service.getPatientHealthDetail(patientId).subscribe( result => {
      this.feedbackList = result.feedback
      this.healthInfoList = result.healthInfo
      this.rrtVisitList = result.rrtVisit
    }, error => this.toastr.error(error.error.message, error.status) )
  }
  setX(x: object) {
    this.x = x;
  }
  loadMap() {
    this.map = L.map('map', {
      center: [20.296059, 85.824539],
      zoom: 15
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', { foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' }).addTo(this.map);
    this.layerGroup = L.layerGroup().addTo(this.map);
  }
  showPatientLocation(x: object) {
    this.x = x;
    this.layerGroup.clearLayers();
    this.map.panTo(new L.LatLng(this.x.latitude, this.x.longitude));
    let popupContent = `<b >Patient detail.</b><br>ID: ${this.x.patientId} <br>Name: ${this.x.patientName} <br>Visited on : ${new Date(this.x.visitOn).toLocaleDateString()} <br>`;
    L.circle([this.x.latitude, this.x.longitude], {
      radius: 50,
      fillOpacity: 0.6,
      color: 'red',
    }).addTo(this.layerGroup)
        .bindPopup(popupContent);        
  }

}
