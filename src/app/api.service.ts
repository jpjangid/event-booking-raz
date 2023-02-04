import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public _baseurl = environment.apiUrl;
  constructor(public http: HttpClient) {
  }

  uplinePost(object):Promise<any>{
    let endpoint = 'Dropdowns/Registration';
    if (object) {
      var queryStrings = new HttpParams({ fromObject: object }).toString();
      endpoint = `${endpoint}?${queryStrings}`;
    }
    return this.http.get(this._baseurl + endpoint).toPromise();
  }


  login(object : any){
    return this.http.post(this._baseurl + 'CustomerBooking/uplineLogin' , object).toPromise();
  }

  getCustomerBookingByUplineId(object:any){
    let endpoint = 'CustomerBooking';
    if (object) {
      var queryStrings = new HttpParams({ fromObject: object }).toString();
      endpoint = `${endpoint}?${queryStrings}`;
    }
    return this.http.get(this._baseurl + endpoint).toPromise();
  }
  getAllCountry() {
    return this.http.get(this._baseurl + 'Dropdowns/Registration?Mode=country').toPromise()
  }

  confirmBooking(data:any) {
    return this.http.post(this._baseurl + 'CustomerBooking/OrderId', data).toPromise();
  }

  createOrderID(object:any) {
    return this.http.post('https://api.razorpay.com/v1/orders' , object).toPromise();
  }
  customerBooking(data:any) {
    return this.http.post(this._baseurl + 'CustomerBooking', data).toPromise();
  }
}
