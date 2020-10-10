import { serverUrl } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CcdService {
  ccdUrl: string = `${serverUrl}/ccd`;
  constructor(private http: HttpClient) { }

  getPatientHealthDetail(patientId: string): Observable<any> {
    return this.http.get(`${this.ccdUrl}/getPatientHealthDetail/${patientId}`)
  }
  getAllPatientsLAstLocation(): Observable<any> {
    return this.http.get(`${serverUrl}/ccd/getAllPatientsLastLocation`)
  }
  getPatientListWithStatus(): Observable<any> {
    return this.http.get(`${serverUrl}/getPatientListWithStatus`);
  }
  getCallHisoryDetails(patientSNo): Observable<any> {
    console.log(patientSNo+"service")
    return this.http.get(`${serverUrl}/getCallHisoryDetails/${patientSNo}`);
  }
  addStatusOfCallData(data: object): Observable<any> {
    return this.http.post(`${serverUrl}/addStatusOfCallData/`, data);
  }
  getPatientVCId(patientId: string): Observable<any> {
    return this.http.get(`${serverUrl}/ccd/getPatientVCId/${patientId}`);
  }
  getTodayDate(): Observable<any> {
    return this.http.get(`${serverUrl}/getTodayDate`);
  }
  getAllZoneList():Observable<any> {
    return this.http.get(`${serverUrl}/admin/getAllZoneList`)
  }
  
}
