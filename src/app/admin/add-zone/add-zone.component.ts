import { AdminService } from './../../admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-zone',
  templateUrl: './add-zone.component.html',
  styleUrls: ['./add-zone.component.css']
})
export class AddZoneComponent implements OnInit {

  map: any;
  polygon: any;
  polygonPoints: any;
  layerGroup: any;
  previousPointsLayer: any;
  assignAreaForm: FormGroup;
  rrtList: any;
  seletctedRrt: any;

  constructor(private toastr: ToastrService, private service: AdminService) { }

  ngOnInit(): void {
    this.loadMap();
    this.getRRTList();
    this.seletctedRrt = '';
    this.polygonPoints = [];
    this.assignAreaForm = new FormGroup({
      zoneName: new FormControl('', [Validators.required]),
      rrtCode: new FormControl('', [Validators.required]),
      rrtName: new FormControl('', [Validators.required]),
      polygonPoints: new FormControl('', [Validators.required])
    })
  }
  resetPolygon() {
    this.layerGroup.clearLayers();
    this.polygonPoints = []
  }
  assignToSurveyOffice() {
    this.assignAreaForm.patchValue({ polygonPoints: this.polygonPoints })
  }
  addRrtToForm(index: any) {
    this.assignAreaForm.patchValue({
      rrtCode: this.rrtList[index - 1].rrtCode,
      rrtName: this.rrtList[index - 1].name
    })
  }
  assign() {
      if(this.assignAreaForm.valid) {
          this.service.assignZoneToRrt(this.assignAreaForm.value).subscribe( result => {
            this.toastr.success(result.message)
            this.getRRTList();
            this.layerGroup.clearLayers();
            this.polygonPoints = [];
            this.seletctedRrt = '';
            this.assignAreaForm.patchValue({
              zoneName: '',
              rrtCode: '',
              rrtName: '',
              polygonPoints: ''
            })
        }, error => this.toastr.error(error.error.message, error.status))
      } else {
        this.toastr.error('Please enter valid inputs.')
      }
  }


  loadMap() {
    this.map = L.map('map', {
      center: [20.286251, 85.858002],
      zoom: 10
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', { foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' }).addTo(this.map);
    this.layerGroup = L.layerGroup().addTo(this.map);
    this.previousPointsLayer = L.layerGroup().addTo(this.map);
    this.loadZoneList();
    this.map.on('click', (event: any) => {
      this.layerGroup.clearLayers();
      this.polygonPoints = this.polygonPoints.concat([[event.latlng.lat, event.latlng.lng]])
      this.polygon = L.polygon(this.polygonPoints, {color: 'red'});
      this.polygon.addTo(this.layerGroup);
    });
  }
  getRRTList() {
      this.service.getRRTList().subscribe( result => {
        this.rrtList = result.rrtList;
        this.loadZoneList();
      }, err => this.toastr.error("R.R. Team can't loaded. Because of some network issue.") )
  }
  loadZoneList() {
    this.service.getAllZoneList().subscribe( result => {
      result.zoneList.forEach( (element: any) => {
            let randomColor = Math.floor(Math.random()*16777215).toString(16)
            let popupContent = `<strong >Zone details</strong><br><hr>ID:  ${element.zoneId} <br>Name :  ${element.zoneName} <br>Created on :  ${new Date(element.addedOn).toLocaleDateString()} <br>`
            this.polygon = L.polygon(element.polygonPoints, {color: `#${randomColor}`});
            this.polygon.addTo(this.previousPointsLayer).bindPopup(popupContent);
      } )
    }, error => this.toastr.error(`Unable to load zone list`, error.status) )
  }
}
