import { Component, HostListener, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/api.service';
declare var Razorpay: any;

@Component({
    selector: 'app-how-it-works',
    templateUrl: './how-it-works.component.html',
    styleUrls: ['./how-it-works.component.scss'],
    providers: [MessageService]
})
export class HowItWorksComponent implements OnInit {

    constructor(private _apiService: ApiService, private messageService: MessageService, private router : Router) { }
 
    bookingData: any = { countryId: null,payMode : 'online' };

    country: any = []

    tableData: any = [{ name: 'Event', price: '17200', Quantity: '0', Total: '0' }]

    ngOnInit() {
        localStorage.removeItem('data');
        localStorage.removeItem('bookingID')
        this._apiService.getAllCountry().then((res: any) => {
            console.log(res);
            this.country = res?.returnValue;
        })
    }

    async signUp(form: NgForm) {
        console.log(form.value);
        // this.bookingData.amount = ;
        let object = {
          amount : Number(this.tableData[0].Total * 100)
        }
        let data = JSON.parse(localStorage.getItem('uplineData'));
        this.bookingData.upLineId = data.upline;
        this.bookingData.downLineId = data?.downline;
        this.bookingData.contactNumber = String(this.bookingData.contactNumber);
        this.bookingData.pinCode = String(this.bookingData.pinCode);
        this.bookingData.amount = Number(this.tableData[0].Total);

        

        // if (form.valid) {
        //     // if(this.bookingData.upLineId) {
        //       let orderId : any
        //       await this._apiService.confirmBooking(object).then((res: any) => {
        //         console.log(res);
        //         orderId = res.orderId;
        //         this.payment(orderId,Number(this.tableData.Total))
        //       })
        //     // }
        //     // else {
        //     //     this.messageService.add({
        //     //         severity: 'error',
        //     //         summary: 'Error',
        //     //         detail: 'Something Went Worng!',
        //     //     });
        //     // }
        // }
        // else {
        //     this.messageService.add({
        //         severity: 'error',
        //         summary: 'Error',
        //         detail: 'Please Fill All the Details!',
        //     });
        // }
        if(form.valid) {

            if(this.bookingData.upLineId) {
                this._apiService.customerBooking(this.bookingData).then((res: any) => {
                    console.log(res);
                    if (res.success) {
                    //   this.messageService.add({
                    //     severity: 'success',
                    //     summary: 'Success',
                    //     detail: 'Customer Registered Successfully!',
                    //   });
          
                    //   let object = {
                    //     status : 'Success',
                    //     customerBookingId : res.returnValue
                    //   }
                    // alert(res.returnValue);
                      localStorage.setItem('bookingID', res.returnValue);
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

            // localStorage.setItem('bookingDetails' , JSON.stringify(this.bookingData));
          localStorage.setItem('data', JSON.stringify(this.tableData[0].Total))
          window.location.href = 'https://adorntourism.com/dataFrom.htm';
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

    // payment(orderId: string, amount: number): void {
    //     let options = {
    //       key: 'rzp_test_HyEmsCRZK8JPca',
    //       amount: amount,
    //       name: 'Event',
    //       description: 'Event Booking',
    //       image: '',
    //       order_id: orderId,
    //       handler: function (response: any) {
    //         var event = new CustomEvent('payment.success', {
    //           detail: response,
    //           bubbles: true,
    //           cancelable: true,
    //         });
    //         window.dispatchEvent(event);
    //       },
    //       prefill: {
    //         name: '',
    //         email: '',
    //         contact: '',
    //       },
    //       notes: {
    //         address: '',
    //       },
    //       theme: {
    //         color: '#3399cc',
    //       },
    //     };
    
    //     var rzp1 = new Razorpay(options);
    //     rzp1.open();
    
    //     rzp1.on('payment.failed', (response: any) => {
    //       console.log(response);
    //       console.log(response.error.code);
    //       console.log(response.error.description);
    //       console.log(response.error.source);
    //       console.log(response.error.step);
    //       console.log(response.error.reason);
    //       console.log(response.error.metadata.order_id);
    //       console.log(response.error.metadata.payment_id);
    //       let statusDetail = {
    //         status: 'Payment Success',
    //         payment_id: response.error.metadata.payment_id,
    //         razorpay_signature: '',
    //         description: response.error.description,
    //       };
    //     });
    //   }
    
    //   @HostListener('window:payment.success', ['$event'])
    //   onPaymentSuccess(event: any): void {
    //     console.log(event);
    //     let statusDetail = {
    //       status: 'Payment Success',
    //       payment_id: event.detail.razorpay_payment_id,
    //       razorpay_signature: event.detail.razorpay_signature,
    //       description: 'Payment Success',
    //     };
    //     let data = JSON.parse(localStorage.getItem('uplineData'));
    //     console.log(data);
    //     this.bookingData.upLineId = data.upline;
    //     this.bookingData.downLineId = data?.downline;
    //     this.bookingData.contactNumber = String(this.bookingData.contactNumber);
    //     this.bookingData.pinCode = String(this.bookingData.pinCode);
    //     this.bookingData.amount = Number(this.tableData[0].Total * 100);
    //     this.bookingData.transactionalID = JSON.stringify(statusDetail)
    //     if(this.bookingData.upLineId) {
    //       this._apiService.customerBooking(this.bookingData).then((res:any) => {
    //         console.log(res);
    //         // alert('booking created')
    //         if(res.success){
    //           if(res.returnValue){
    //             let object = {
    //               transactionalId : JSON.stringify(statusDetail),
    //               customerBookingId : res.returnValue
    //             }
    //             this._apiService.customerPayment(object).then((resp:any)=>{
    //               if(resp.success){
    //                 this.router.navigateByUrl('receipt/' + res.returnValue);
    //               }
    //             })
    //           }
    //         }
    //       })
    //     }
    //     else {
    //       this.messageService.add({
    //                 severity: 'error',
    //                 summary: 'Error',
    //                 detail: 'Something Went Worng!',
    //             });
    //     }
    //   }

}