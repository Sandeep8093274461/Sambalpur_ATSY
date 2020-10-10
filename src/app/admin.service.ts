import { serverUrl } from './../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getRRTList(): Observable<any> {
    return this.http.get(`${serverUrl}/admin/getRRTList`)
  }
  assignZoneToRrt(data: object): Observable<any> {
    return this.http.post(`${serverUrl}/admin/assignZoneToRrt`, data)
  }
  getAllZoneList():Observable<any> {
    return this.http.get(`${serverUrl}/admin/getAllZoneList`)
  }
  removeZone(zoneId: string): Observable<any> {
    return this.http.delete(`${serverUrl}/admin/removeZone/${zoneId}`)
  }
}
