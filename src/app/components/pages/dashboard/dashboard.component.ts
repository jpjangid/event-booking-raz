import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/api.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(private _apiService: ApiService, private router: Router) { }
    user: any;
    customerBookingList: any = [];
    ngOnInit(): void {
        if (localStorage.getItem('eventUser')) {
            this.user = JSON.parse(localStorage.getItem('eventUser'));
            let object = { upLineId: this.user?.upLineId }
            this._apiService.getCustomerBookingByUplineId(object).then((res: any) => {
                console.log(res);
                if (res.success) {
                    this.customerBookingList = res.returnValue;
                }
            })
        }

        else {
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate(['/']);
        }
    }

    breadcrumb = [
        {
            title: this.customerBookingList[0]?.upLineName,
            subTitle: 'Dashboard'
        }
    ]


    @ViewChild('dt') FilteredData: Table;
    searchFilter(event?: any) {
        let date = moment(event).format('YYYY-MM-DD')
        this.FilteredData.filter(date, 'bookingDate', 'contains');
    }

    filterval: string = '';
    dateFilterVal: string = '';
    reset(dt) {
        dt.reset();
        this.filterval = '';
        this.dateFilterVal = ''
    }

    getReceipt(customer:any){
        console.log(customer);
        this.router.navigateByUrl('/receipt/' + customer.customerBookingId)
    }

};