import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AppUtility } from 'src/app/interceptor/appUtitlity';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  constructor(private router : ActivatedRoute , private route : Router , private _apiService : ApiService , private commonFunction : AppUtility) { }

  user : any = {};
  ngOnInit(): void {
    this.commonFunction.loader(true);
    let id = this.router.snapshot.params;
    let object = {
      customerBookingId : id.id
    }
    if(id.id){
      this._apiService.getCustomerBookingByUplineId(object).then((res:any)=>{
        console.log(res);
        if(res.success){
          this.commonFunction.loader(false);
          this.user = res.returnValue[0];
          console.log(this.user);
        }

        else{
          this.commonFunction.loader(false);
        }
      })
    }
  }


  print(){
    window.print();
  }


}
