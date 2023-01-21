import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
    selector: 'app-how-it-works',
    templateUrl: './how-it-works.component.html',
    styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {

    constructor(private _apiService : ApiService) { }

    bookingData : any = {countryId : null};

    country:any = []

    ngOnInit() {
        this._apiService.getAllCountry().then((res:any) => {
            console.log(res);
            this.country = res?.returnValue;
        })
    }

    signUp(form:NgForm) {
        console.log(form.value);
        if(form.valid) {
            this._apiService.confirmBooking(this.bookingData).then((res:any)=> {
                console.log(res);
            })
        }
    }

}