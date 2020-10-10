import { ToastrService } from 'ngx-toastr';
import { CcdService } from './../ccd.service';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-patients-last-location',
  templateUrl: './patients-last-location.component.html',
  styleUrls: ['./patients-last-location.component.css']
})
export class PatientsLastLocationComponent implements OnInit {

  map: any;
  polygon: any;
  polygonPoints: any;
  layerGroup: any;
  constructor(private service: CcdService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadPatientsLocation()
    this.loadMap();
  }
  loadMap() {
    this.map = L.map('previewMap', {
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

}
