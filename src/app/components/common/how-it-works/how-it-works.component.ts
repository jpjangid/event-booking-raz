import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/api.service';

@Component({
    selector: 'app-how-it-works',
    templateUrl: './how-it-works.component.html',
    styleUrls: ['./how-it-works.component.scss'],
    providers: [MessageService]
})
export class HowItWorksComponent implements OnInit {

    constructor(private _apiService: ApiService, private messageService: MessageService) { }

    bookingData: any = { countryId: null };

    country: any = []

    tableData: any = [{ name: 'Event', price: '18000', Quantity: '0', Total: '0' }]

    ngOnInit() {
        this._apiService.getAllCountry().then((res: any) => {
            console.log(res);
            this.country = res?.returnValue;
        })
    }

    signUp(form: NgForm) {
        console.log(form.value);
        let data = JSON.parse(localStorage.getItem('uplineData'));
        console.log(data);
        this.bookingData.upLineId = data.upline;
        this.bookingData.downLineId = data?.downline;
        this.bookingData.contactNumber = String(this.bookingData.contactNumber);
        this.bookingData.pinCode = String(this.bookingData.pinCode);
        if (form.valid) {
            if(this.bookingData.upLineId) {
                this._apiService.confirmBooking(this.bookingData).then((res: any) => {
                    console.log(res);
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
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please Fill All the Details!',
            });
        }
    }

    getTotalAmount() {
        this.tableData[0].Quantity = this.bookingData.bookingQuantity; 
        this.tableData[0].Total = (this.bookingData.bookingQuantity) * this.tableData[0].price; 
    }

}