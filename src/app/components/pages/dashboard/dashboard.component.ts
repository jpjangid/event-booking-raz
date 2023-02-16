import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/api.service';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(private _apiService: ApiService, private router: Router) { }
    user: any;
    downLine : boolean = false;
    customerBookingList: any = [];
    ngOnInit(): void {
        if (localStorage.getItem('eventUser')) {
            this.user = JSON.parse(localStorage.getItem('eventUser'));
            let object = { upLineId: this.user?.upLineId }
            this._apiService.getCustomerBookingByUplineId(object).then((res: any) => {
                // console.log(res);
                if (res.success) {
                    this.customerBookingList = res.returnValue;
                    this.customerBookingList.forEach(element => {
                        let data = JSON.parse(element.transactionalID);
                        element.transactionalID = data.payment_id;
                        element.status = data.status;
                        this.downLine = element.downLineName ? true : false;
                    });
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
        // console.log(customer);
        this.router.navigateByUrl('/receipt/' + customer.customerBookingId)
    }

    exportExcel() {
        let excelData : any = [];
        this.customerBookingList.forEach(element => {
            let object = {
                'Customer Bookind Id' : element.customerBookingId,
                'Customer Name' : element.customerName,
                'IR ID' : element.yourId,
                'Booking Quantity' : element.bookingQuantity,
                'Email' : element.emailAddress,
                'Contact Number' : element.contactNumber,
                'City' : element.city,
                'State' : element.state,
                'Pincode' : element.pinCode,
                'Order Number' : element.transactionalID,
                'Amount' : element.totalPrice,
                'Date' : element.bookingDate,
                'Status' : element.status,
                'Downline' : element.downLineName
            }
            excelData.push(object);
        });

        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(excelData);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "customers");
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }

};