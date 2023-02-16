import { Component, HostListener, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/api.service';
import { AppUtility } from 'src/app/interceptor/appUtitlity';
declare var Razorpay: any;

@Component({
    selector: 'app-how-it-works',
    templateUrl: './how-it-works.component.html',
    styleUrls: ['./how-it-works.component.scss'],
    providers: [MessageService]
})
export class HowItWorksComponent implements OnInit {

    constructor(private _apiService: ApiService, private messageService: MessageService, private router : Router, private commonFunction : AppUtility) { }
 
    bookingData: any = { countryId: 1,payMode : 'online' };

    country: any = [];

    displayModal:boolean = false;

    acceptTerms:boolean = false;

    tableData: any = [{ name: 'Magic 2023', price: '17200', Quantity: '0', Total: '0' }]

    ngOnInit() {
        if(localStorage.getItem('otherDetail')) {
            let details = JSON.parse(localStorage.getItem('otherDetail'));
            // if(details) {
                this.tableData[0].price = details.price;
                this.tableData[0].name = details.name;
            // }
        }
        else {
            this.tableData = [{ name: 'Magic 2023', price: '17200', Quantity: '0', Total: '0' }]
        }
        localStorage.removeItem('data');
        localStorage.removeItem('bookingID');
        localStorage.removeItem('bookingDetails');
        this._apiService.getAllCountry().then((res: any) => {
            // console.log(res);
            this.country = res?.returnValue;
        })
    }

    onChange(event:any) {
      if(event.target.checked) {
        this.acceptTerms = true;
      }
      else {
        this.acceptTerms = false;
      }
    }

    async signUp(form: NgForm) {
        // console.log(form.value);
        // this.bookingData.amount = ;
        let object = {
          // amount : Number(this.tableData[0].Total * 100)
          amount : Number(10000)
        }
        let data = JSON.parse(localStorage.getItem('uplineData'));
        this.bookingData.upLineId = Number(data?.upline);
        this.bookingData.downLineId = Number(data?.downline);
        this.bookingData.contactNumber = String(this.bookingData.contactNumber);
        this.bookingData.pinCode = String(this.bookingData.pinCode);
        this.bookingData.amount = Number(this.tableData[0].Total);
        this.bookingData.price = Number(this.tableData[0].price);
        this.bookingData.totalPrice = Number(this.tableData[0].Total);

        
        if(this.acceptTerms) {
          if (form.valid) {
              if(this.bookingData.upLineId) {
                let orderId : any
                this.commonFunction.loader(true);
                await this._apiService.confirmBooking(object).then((res: any) => {
                  // console.log(res);
                  this.commonFunction.loader(false);
                  orderId = res.orderId;
                  this.payment(orderId,Number(this.tableData.Total))
                })
              }
              else {
                  this.messageService.add({
                      severity: 'error',
                      summary: 'Error',
                      detail: 'Something Went Worng!',
                  });
                  setTimeout(() => {
                    this.router.navigateByUrl('/');
                  }, 1500);
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
        else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Please Accept Terms & Conditions!',
        });
        }
        // if(form.valid) {

        //     if(this.bookingData.upLineId) {
        //         this._apiService.customerBooking(this.bookingData).then((res: any) => {
        //             console.log(res);
        //             if (res.success) {
        //             //   this.messageService.add({
        //             //     severity: 'success',
        //             //     summary: 'Success',
        //             //     detail: 'Customer Registered Successfully!',
        //             //   });
          
        //             //   let object = {
        //             //     status : 'Success',
        //             //     customerBookingId : res.returnValue
        //             //   }
        //             // alert(res.returnValue);
        //             let data = res.returnValue;
        //             localStorage.setItem('bookingID', data);
        //             localStorage.setItem('bookingDetails' , JSON.stringify(this.bookingData));
        //             localStorage.setItem('data', JSON.stringify(this.tableData[0].Total))
        //             window.location.href = 'https://adorntourism.com/dataFrom.htm';
        //             }
        //             else {
        //                 this.messageService.add({
        //                     severity: 'error',
        //                     summary: 'Error',
        //                     detail: 'Something Went Worng!',
        //                 });
        //             }
        //             // alert(res.returnValue);
        //         })
        //     }
        //     else {
        //         this.messageService.add({
        //             severity: 'error',
        //             summary: 'Error',
        //             detail: 'Something Went Worng!',
        //         });
        //     }
        // }
        // else {
        //     this.messageService.add({
        //         severity: 'error',
        //         summary: 'Error',
        //         detail: 'Please Fill All the Details!',
        //     });
        // }
    }

    getTotalAmount() {
        this.tableData[0].Quantity = this.bookingData.bookingQuantity; 
        this.tableData[0].Total = (this.bookingData.bookingQuantity) * this.tableData[0].price; 
    }

    payment(orderId: string, amount: number): void {
        let options = {
          key: 'rzp_live_bDo6gdxtqwRAn9',
          amount: amount,
          name: 'Event',
          description: 'Event Booking',
          image: '',
          order_id: orderId,
          handler: function (response: any) {
            var event = new CustomEvent('payment.success', {
              detail: response,
              bubbles: true,
              cancelable: true,
            });
            window.dispatchEvent(event);
          },
          prefill: {
            name: '',
            email: '',
            contact: '',
          },
          notes: {
            address: '',
          },
          theme: {
            color: '#3399cc',
          },
        };
    
        var rzp1 = new Razorpay(options);
        rzp1.open();
    
        rzp1.on('payment.failed', (response: any) => {
          // console.log(response);
          // console.log(response.error.code);
          // console.log(response.error.description);
          // console.log(response.error.source);
          // console.log(response.error.step);
          // console.log(response.error.reason);
          // console.log(response.error.metadata.order_id);
          // console.log(response.error.metadata.payment_id);
          let statusDetail = {
            status: 'Payment Success',
            payment_id: response.error.metadata.payment_id,
            razorpay_signature: '',
            description: response.error.description,
          };
        });
      }
    
      @HostListener('window:payment.success', ['$event'])
      async onPaymentSuccess(event: any): Promise<void> {
        // console.log(event);
        let statusDetail = {
          status: 'Payment Success',
          payment_id: event.detail.razorpay_payment_id,
          razorpay_signature: event.detail.razorpay_signature,
          description: 'Payment Success',
        };
        let data = JSON.parse(localStorage.getItem('uplineData'));
        // console.log(data);
        this.bookingData.upLineId = data.upline;
        this.bookingData.downLineId = data?.downline;
        this.bookingData.contactNumber = String(this.bookingData.contactNumber);
        this.bookingData.pinCode = String(this.bookingData.pinCode);
        this.bookingData.amount = Number(this.tableData[0].Total);
        this.bookingData.price = Number(this.tableData[0].price);
        this.bookingData.totalPrice = Number(this.tableData[0].Total);
        this.bookingData.orderNo = String(statusDetail.payment_id);
        this.bookingData.transactionalID = JSON.stringify(statusDetail)
        if(this.bookingData.upLineId) {
          await this._apiService.customerBooking(this.bookingData).then((res:any) => {
            // console.log(res);
            // alert('booking created')
            if(res.success){
              localStorage.setItem('amount', JSON.stringify(this.bookingData.amount))
              // this.router.navigateByUrl('receipt/' + res.returnValue);

              //got error so redirect before

              if(res.returnValue){
                let object = {
                  transactionalId : JSON.stringify(statusDetail),
                  customerBookingId : res.returnValue
                }
                this._apiService.customerPayment(object).then((resp:any)=>{
                  if(resp.success){
                    this.router.navigateByUrl('receipt/' + res.returnValue);
                  }
                })
              }
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

}