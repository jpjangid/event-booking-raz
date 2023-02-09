import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.scss']
})
export class SuccessPageComponent implements OnInit {

  constructor(private _apiService: ApiService, private messageService: MessageService , private router : Router) { }

  bookingData: any;
  ngOnInit(): void {
    // window.location.reload();
    this.bookingData = localStorage.getItem('bookingDetails');
    if (this.bookingData) {
      let bookingData = JSON.parse(this.bookingData);
      let data = JSON.parse(localStorage.getItem('uplineData'));
      if (data?.upLineId) {
        this._apiService.customerBooking(bookingData).then((res: any) => {
          console.log(res);
          if (res.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Customer Registered Successfully!',
            });

            let object = {
              status : 'Success',
              customerBookingId : res.returnValue
            }
            this._apiService.customerPayment(object).then((resp:any)=>{
              if(resp.success){
                this.router.navigateByUrl('receipt/' + res.returnValue);
              }
            })
          }
        })
      }
      else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something Went Worng!',
        });
      }
    }

    else {

    }
  }

}
