import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(private _apiService : ApiService) { }
    user : any;
    customerBookingList : any = [];
    ngOnInit(): void {
        if(localStorage.getItem('eventUser')){
            this.user = JSON.parse(localStorage.getItem('eventUser'));
            let object = {YourId : this.user?.upLineId}
            this._apiService.getCustomerBookingByUplineId(object).then((res:any)=>{
                console.log(res);
                if(res.success){
                    this.customerBookingList = res.returnValue;
                }
            })
        }
    }

    breadcrumb = [
        {
            title: 'Howdy, Andy!',
            subTitle: 'Dashboard'
        }
    ]


    // @ViewChild ('dt') FilteredData:Table;
    // searchFilter(event?: any) {
    //     let date = moment(event).format('DD-MM-YYYY')
    //     this.FilteredData.filter(date, 'billDate', 'contains');
    //   }
    
    //   reset(dt) {
    //     dt.reset();
    //     this.filterval = '';
    //     this.dateFilterVal = ''
    //   }

};