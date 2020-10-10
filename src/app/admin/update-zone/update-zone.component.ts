import { ToastrService } from 'ngx-toastr';
import { AdminService } from './../../admin.service';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-update-zone',
  templateUrl: './update-zone.component.html',
  styleUrls: ['./update-zone.component.css']
})
export class UpdateZoneComponent implements OnInit {

  zoneList: any
  map: any;
  polygon: any;
  polygonPoints: any;
  layerGroup: any;
  x: any;
  constructor(private service: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.zoneList = [];
    this.x = {};
    this.loadZoneList()
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
  loadZoneList() {
    this.service.getAllZoneList().subscribe( result => {
      this.zoneList = result.zoneList;
      this.previewAllZones();
    }, error => this.toastr.error(`Unable to load zone list`, error.status) )
  }
  previewSingleZone(x: any) {
    this.layerGroup.clearLayers();
    this.drawPolygon(x)
  }
  previewAllZones() {
    this.layerGroup.clearLayers();
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
  setX(x: any) {
    this.x = x;
  }
  removeZone() {
    this.service.removeZone(this.x.zoneId).subscribe( result => {
      this.toastr.success(result.message);
      this.loadZoneList();
    }, error => this.toastr.error(error.error.message, error.status))
  }

}
