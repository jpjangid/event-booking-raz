import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-cancel-page',
  templateUrl: './cancel-page.component.html',
  styleUrls: ['./cancel-page.component.scss']
})
export class CancelPageComponent implements OnInit {
  bookingData: string;

  constructor(private _apiService: ApiService, private messageService: MessageService , private router : Router) { }


  ngOnInit(): void {
    this.bookingData = localStorage.getItem('bookingDetails');
    if (this.bookingData) {
      let bookingData = JSON.parse(this.bookingData);
      let data = JSON.parse(localStorage.getItem('uplineData'));
      if (data?.upLineId) {
        this._apiService.customerBooking(bookingData).then((res: any) => {
          console.log(res);
          if (res.success) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Customer not Registered!',
            });

            let object = {
              status : 'Failed',
              customerBookingId : res.returnValue
            }
            this._apiService.customerPayment(object).then((resp:any)=>{
              console.log(resp);
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
