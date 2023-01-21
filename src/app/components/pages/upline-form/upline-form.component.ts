import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-upline-form',
  templateUrl: './upline-form.component.html',
  styleUrls: ['./upline-form.component.scss']
})
export class UplineFormComponent implements OnInit {

  constructor(private _apiService : ApiService) { }
  
  uplineForm = new FormGroup({
    Cond1: new FormControl('', [Validators.required]),
    downLineName: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    this.getUpline();
  }

  uplineList : any = [];
  downlineList : any = [];
  getUpline() { 
    let object = {
      Mode : 'upline'
    }
    this._apiService.uplinePost(object).then((res:any)=>{
      console.log(res);
      if(res.success){
        this.uplineList = res.returnValue;
      }
    })
  }


  getDownline(){
    this.downlineList = [];
    let object = {
      Mode : 'downline',
      Cond1 : this.uplineForm.get('Cond1').value
    }
    this._apiService.uplinePost(object).then((res:any)=>{
      console.log(res);
      if(res.success){
        this.uplineList = res.returnValue;
      }
    })
  }

}
