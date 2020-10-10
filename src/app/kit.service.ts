import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { kitdata } from './kitdata';
import { deliveryorderdata } from './deliveryorderdata';
import { Observable } from 'rxjs';
import { serverUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class patientService {

  constructor( private http: HttpClient) { }

insertkitdata(data: kitdata): Observable<any> {
  return this.http.post(`${serverUrl}/kit/addKitToStock/`, data);
}
loginvalidation(data): Observable<any> {
  return this.http.post(`${serverUrl}/kit/loginvalidation`, data);
}
insertdeliverystaffdata(data): Observable<any> {
  return this.http.post(`${serverUrl}/kit/addDeliveryStaff`,data);
}
insertdeliveryorderlistdata(data: deliveryorderdata): Observable<any> {
  return this.http.post(`${serverUrl}/kit/addDeliveryOrderList`, data);
}
getAllKitList(kiitSupplierId: any): Observable<any> {
  return this.http.get(`${serverUrl}/kit/getAllKitList?kiitSupplierId=${kiitSupplierId}`);
}
getDeliveryStaffList(kitSupplierId: string): Observable<any> {
  return this.http.get(`${serverUrl}/kit/getDeliveryStaffList?kitSupplierId=${kitSupplierId}`);
}
getViewDeliveryOrderList(empId: string): Observable<any> {
  return this.http.get(`${serverUrl}/kit/getViewDeliveryOrderList/${empId}`);
}


getAllStockList(): Observable<any> {
   return this.http.get(`${serverUrl}/kit/getKitStockList`);
}
getOrderList(): Observable<any> {
   return this.http.get(`${serverUrl}/kit/getOrderList`);
}

getEditData(serialNo): Observable<any> {
   return this.http.get(`${serverUrl}/kit/getKitDetails/${serialNo}`);
}

updatekitdata(serialNo, kitBody): Observable<any> {
  return this.http.put(`${serverUrl}/kit/updateKitDetail/${serialNo}`, kitBody);
}

updateDeliveryStaffData(empId, dataBody): Observable<any> {
  return this.http.put(`${serverUrl}/kit/updateDeliveryStaffDetail/${empId}`, dataBody);
}

updatereturndata(serialNo, kitBody): Observable<any> {
  return this.http.put(`${serverUrl}/kit/kitReturn/${serialNo}` , kitBody);
}

updateDeliverConfirm(serialNo, patientId): Observable<any> {
  return this.http.put(`${serverUrl}/kit/updateDeliverConfirm/${serialNo}` , patientId);
}

deleteData(serialNo): Observable<any> {
   return this.http.delete(`${serverUrl}/kit/kitDelete/${serialNo}` );
}

deleteDeliveryStaffData(empId): Observable<any> {
   return this.http.delete(`${serverUrl}/kit/deliveryStaffDelete/${empId}`);
}

exchangedata(oldSerialNo, exdata): Observable<any> {
   return this.http.put(`${serverUrl}/kit/kitExchange/${oldSerialNo}`, exdata);
}
}