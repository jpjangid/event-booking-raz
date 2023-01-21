import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-how-it-works',
    templateUrl: './how-it-works.component.html',
    styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {

    constructor() { }

    bookingData : any = {};

    country:any = []

    ngOnInit() {
        // this._apiService.
    }

    signUp(form:NgForm) {

    }

}