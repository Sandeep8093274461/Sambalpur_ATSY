import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { serverUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  addPatientData(data: object): Observable<any> {
    return this.http.post(`${serverUrl}/addPatientData/`, data);
  }
  getPatientList(): Observable<any> {
    return this.http.get(`${serverUrl}/getPatientList`);
  }
  deletePatientData(patientSNo): Observable<any> {
    return this.http.delete(`${serverUrl}/deletePatientData/${patientSNo}`);
  }

  updatePatientData(patientSNo, data: object): Observable<any> {
    return this.http.put(`${serverUrl}/updatePatientData/${patientSNo}`, data);
  }
  addExcelDataData(data: object): Observable<any> {
    return this.http.post(`${serverUrl}/addExcelDataData/`, data);
  }
  rrVistiData(data: object): Observable<any> {
    return this.http.post(`${serverUrl}/rrVistiData`, data);
  }









  addFeedback(data: object): Observable<any>{
    return this.http.post(`${serverUrl}/addFeedback/`,data);
  }
  addEmergencyMsg(data: object): Observable<any>{
    console.log(data)
    return this.http.post(`${serverUrl}/addEmergencyMsg/`,data);
  }
  addHealthInfo(healthData: object): Observable<any> {
    return this.http.post(`${serverUrl}/addHealthInfo`, healthData);
  }
  checkPatientIdExistance(patientId: string): Observable<any> {
    return this.http.get(`${serverUrl}/checkPatientIdExistance/${patientId}`)
  }
  addPatientUnavailable(remark: object): Observable<any> {
    return this.http.post(`${serverUrl}/addPatientUnavailable`, remark)
  }


  getBlockList(): Observable<any> {
    return this.http.get(`${serverUrl}/getBlockList`);
  }
  loadAllPaitientsBlockWise(): Observable<any> {
    return this.http.get(`${serverUrl}/loadAllPaitientsBlockWise`);
  }
  loadAllPaitientsGenderWise(): Observable<any> {
    return this.http.get(`${serverUrl}/loadAllPaitientsGenderWise`);
  }
  loadAllPaitientsAgeWise(): Observable<any> {
    return this.http.get(`${serverUrl}/loadAllPaitientsAgeWise`);
  }
  loadAllCallHistory(): Observable<any> {
    return this.http.get(`${serverUrl}/loadAllCallHistory`);
  }
  loadAllPaitientsList(): Observable<any> {
    return this.http.get(`${serverUrl}/loadAllPaitientsList`);
  }
  loadAllPaitientsCovidWarriorWise(): Observable<any> {
    return this.http.get(`${serverUrl}/loadAllPaitientsCovidWarriorWise`);
  }
  loadAllPaitientsKitWise(): Observable<any> {
    return this.http.get(`${serverUrl}/loadAllPaitientsKitWise`);
  }
  agewiseMaleFememaleData(): Observable<any> {
    return this.http.get(`${serverUrl}/agewiseMaleFememaleData`);
  }

  updatePatientPeerId(patientId: string, peerId: string): Observable<any> {
    return this.http.put(`${serverUrl}/updatePatientPeerId/${patientId}`, {peerId: peerId})
  }


}