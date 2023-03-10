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
  statusDetail: { status: string; payment_id: any; razorpay_signature: any; description: string; };
  screenshot: any;

  constructor(private _apiService: ApiService, private messageService: MessageService, private router: Router, private commonFunction: AppUtility) { }

  bookingData: any = { countryId: 1, payMode: '', paymentType : '' };

  imageCheck:boolean = false;

  country: any = [];

  displayModal: boolean = false;

  acceptTerms: boolean = false;

  tableData: any = [{ name: 'Magic 2023', price: 17200, Quantity: 0, Total: 0 }]

  ngOnInit() {
    this.bookingData = { countryId: 1, payMode: '', paymentType : '' };
    if (localStorage.getItem('otherDetail')) {
      let details = JSON.parse(localStorage.getItem('otherDetail'));
      // if(details) {
      this.tableData[0].price = details.price;
      this.tableData[0].name = details.name;
      // }
    }
    else {
      this.tableData = [{ name: 'Magic 2023', price: 17200, Quantity: 0, Total: 0 }]
    }
    localStorage.removeItem('data');
    localStorage.removeItem('mode');
    localStorage.removeItem('bookingID');
    localStorage.removeItem('bookingDetails');
    this._apiService.getAllCountry().then((res: any) => {
      // console.log(res);
      this.country = res?.returnValue;
    })
  }

  onChange(event: any) {
    if (event.target.checked) {
      this.acceptTerms = true;
    }
    else {
      this.acceptTerms = false;
    }
  }

  onClick(event: any) {
    console.log(event.target.value);
    if (!(event.target.value > 0 && event.target.value < 20)) {
      this.bookingData.bookingQuantity = ''
    }
  }

  async signUp(form: NgForm) {
    // alert(this.tableData[0].Total);
    // console.log(form.value);
    // this.bookingData.amount = ;
    let object = {
      amount: Number(this.tableData[0].Total * 100)
      // amount : Number(1000)
    }
    let data = JSON.parse(localStorage.getItem('uplineData'));
    this.bookingData.upLineId = Number(data?.upline);
    this.bookingData.downLineId = Number(data?.downline ?? 0);
    this.bookingData.contactNumber = String(this.bookingData.contactNumber);
    this.bookingData.pinCode = String(this.bookingData.pinCode);
    this.bookingData.amount = Number(this.tableData[0].Total);
    this.bookingData.price = Number(this.tableData[0].price);
    this.bookingData.totalPrice = Number(this.tableData[0].Total);


    if (this.acceptTerms) {
      if (form.valid) {
        if (this.bookingData.upLineId) {
          if(this.bookingData.payMode == 'online') {
            let orderId: any
            this.commonFunction.loader(true);
            await this._apiService.confirmBooking(object).then((res: any) => {
              // console.log(res);
              this.commonFunction.loader(false);
              orderId = res.orderId;
              this.payment(orderId, Number(this.tableData.Total))
            })
          }
          else {
            this.statusDetail = {
              status: 'Payment Success',
              payment_id: '',
              razorpay_signature: '',
              description: 'Payment Success',
            };
            this.createCustomerBooking();
          }
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
    this.tableData[0].Total = Number(this.bookingData.bookingQuantity) * Number(this.tableData[0].price);
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
    this.statusDetail = {
      status: 'Payment Success',
      payment_id: event.detail.razorpay_payment_id,
      razorpay_signature: event.detail.razorpay_signature,
      description: 'Payment Success',
    };

    this.createCustomerBooking();
  }

  async createCustomerBooking() {
    let data = JSON.parse(localStorage.getItem('uplineData'));

    let formData = new FormData();
    
    formData.append('UpLineId', JSON.parse(data.upline))
    if(data?.downline) {
      formData.append('DownLineId', JSON.parse(data?.downline))
    }
    else {
      formData.append('DownLineId', JSON.parse('0'))
    }
    formData.append('CustomerName', this.bookingData.customerName)
    formData.append('YourId', this.bookingData.yourId)
    formData.append('BookingQuantity', JSON.parse(this.bookingData.bookingQuantity))
    formData.append('EmailAddress', this.bookingData.emailAddress)
    formData.append('ContactNumber', this.bookingData.contactNumber)
    formData.append('City', this.bookingData.city)
    formData.append('State', this.bookingData.state)
    formData.append('PinCode', this.bookingData.pinCode)
    formData.append('PayMode', this.bookingData.payMode)
    formData.append('TransactionalID', JSON.stringify(this.statusDetail))
    formData.append('countryId', JSON.parse(this.bookingData.countryId))
    formData.append('Price', this.tableData[0].price)
    formData.append('TotalPrice', this.tableData[0].Total)
    formData.append('Amount', this.tableData[0].price)
    formData.append('OrderNo', this.statusDetail.payment_id)
    formData.append('IRIDNo', this.bookingData?.yourId)
    formData.append('IsApproved', (this.bookingData.payMode == 'online') ? JSON.parse('true') : JSON.parse('false'))
    if(this.bookingData.payMode == 'offline') {
      formData.append('PaymentType', this.bookingData.paymentType)
      formData.append('Document', this.screenshot)
    }
    // this.bookingData.upLineId = Number(data.upline);
    // this.bookingData.downLineId = Number(data?.downline ?? 0);
    // this.bookingData.contactNumber = String(this.bookingData.contactNumber);
    // this.bookingData.pinCode = String(this.bookingData.pinCode);
    // this.bookingData.amount = Number(this.tableData[0].Total);
    // this.bookingData.price = Number(this.tableData[0].price);
    // this.bookingData.totalPrice = Number(this.tableData[0].Total);
    // this.bookingData.orderNo = String(this.statusDetail.payment_id);
    // this.bookingData.transactionalID = JSON.stringify(this.statusDetail);
    // if(this.bookingData.paymode == 'online') {
    //   this.bookingData.IsApproved = 1
    // }
    // else if(this.bookingData.paymode == 'offline') {
    //   this.bookingData.IsApproved = 0
    // }
    if (this.bookingData.upLineId) {
      this.commonFunction.loader(true);
      await this._apiService.customerBooking(formData).then((res: any) => {
        // console.log(res);
        // alert('booking created')
        if (res.success) {
          localStorage.setItem('amount', JSON.stringify(this.bookingData?.amount))
          localStorage.setItem('mode', this.bookingData.payMode);
          // this.router.navigateByUrl('receipt/' + res.returnValue);

          //got error so redirect before

          if (res.returnValue) {
            let object = {
              transactionalId: JSON.stringify(this.statusDetail),
              customerBookingId: res?.returnValue,
              customerName: this.bookingData?.customerName,
              iridNo: this.bookingData?.yourId,
              emailAddress: this.bookingData?.emailAddress,
              totalPrice: this.bookingData?.amount,
              orderNo: this.statusDetail?.payment_id,
              IsApproved : true
            }
            if(this.bookingData.payMode == 'offline') {
              this.commonFunction.loader(false);
              this.router.navigateByUrl('receipt/' + res.returnValue);
            }
            else {
              this._apiService.customerPayment(object).then((resp: any) => {
                if (resp.success) {
                  this.commonFunction.loader(false);
                  this.router.navigateByUrl('receipt/' + res.returnValue);
                }
  
                else {
                  this.commonFunction.loader(false);
                }
              })
            }
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

  onPaymentClick() {
    if(this.bookingData.payMode == 'offline') {
      console.log(this.bookingData.payMode)
      this.imageCheck = true;
    }
    else if(this.bookingData.payMode == 'online') {
      console.log(this.bookingData.payMode)
      this.imageCheck = false
    }
  }

  onImageClick(event : any) {
    console.log(typeof(JSON.parse('1')))
    this.screenshot = event.target.files[0];
    console.log(this.screenshot)
  }

}