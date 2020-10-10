import { Observable } from 'rxjs';
import { serverUrl } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RrtService {

  constructor(private http: HttpClient) { }


  validateRrtAndGetZoneList(data: object): Observable<any> {
    return this.http.post(`${serverUrl}/validateRrtAndGetZoneList`, data);
  }
  getRrtZoneWisePatientList(rrtCode: string, zoneId: string): Observable<any> {
    return this.http.get(`${serverUrl}/getRrtZoneWisePatientList/${rrtCode}/${zoneId}`);
  }
}
