import { ToastrService } from 'ngx-toastr';
import { CcdService } from './../../ccd.service';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-zone-patient-location',
  templateUrl: './zone-patient-location.component.html',
  styleUrls: ['./zone-patient-location.component.css']
})
export class ZonePatientLocationComponent implements OnInit {


  map: any;
  polygon: any;
  polygonPoints: any;
  layerGroup: any;
  zoneList: any
  constructor(private service: CcdService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadPatientsLocation()
    this.loadMap();
    this.zoneList = [];
    this.loadZoneList()
  }

  loadMap() {
    this.map = L.map('dashboardMapPreview', {
      center: [20.286251, 85.858002],
      zoom: 10
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', { foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' }).addTo(this.map);
    this.layerGroup = L.layerGroup().addTo(this.map);
  }
  loadPatientsLocation() {
    this.service.getAllPatientsLAstLocation().subscribe( result => {
      this.addAllPointsToMap(result.list)
    }, error => this.toastr.error(`Unable to load zone list`, error.status) )
  }
  addAllPointsToMap(patientList: any) {
      patientList.forEach( (element: any) => {
        let popupContent = `<strong >Patient details</strong><br><hr>
        ID:  ${element.patientId} <br>
        Name :  ${element.patientName} <br>
        Register on :  ${new Date(element.registerOn).toLocaleDateString()} <br>
        Age :  ${element.age} <br>
        Gender :  ${element.gender} <br>
        Mobile no. :  ${element.mobileno} <br>
        Latitude :  ${element.latitude} <br>
        Langitude :  ${element.longitude} <br>`
        L.circle([element.latitude, element.longitude], {
            radius: 50,
            fillOpacity: 0.6,
            color: 'red',
        }).addTo(this.layerGroup)
            .bindPopup(popupContent);
      });
  }

  loadZoneList() {
    this.service.getAllZoneList().subscribe( result => {
      this.zoneList = result.zoneList;
      this.previewAllZones();
    }, error => this.toastr.error(`Unable to load zone list`, error.status) )
  }
  previewAllZones() {
    this.zoneList.forEach( (element: any) => {
      this.drawPolygon(element)
    } )
  }
  drawPolygon(x: any) {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    let popupContent = `<strong >Zone details</strong><br><hr>ID:  ${x.zoneId} <br>Name :  ${x.zoneName} <br>Created on :  ${new Date(x.addedOn).toLocaleDateString()} <br>`;
    this.polygon = L.polygon(x.polygonPoints, {color: `#${randomColor}`});
    this.polygon.addTo(this.layerGroup).bindPopup(popupContent);
  }
}
