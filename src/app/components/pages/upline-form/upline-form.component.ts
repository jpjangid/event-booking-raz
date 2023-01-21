import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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

  submitNext(upline : NgForm){
    console.log(this.uplineForm.valid)
    if(this.uplineForm.valid){
      let object = {
        upline : this.uplineForm.value?.Cond1,
        downline : this.uplineForm.value?.downLineName
      }
      localStorage.setItem('uplineData' , JSON.stringify(object));
    }
  }


  getDownline(){
    this.downlineList = [];
    this.uplineForm.get('downLineName').setValue('');
    let object = {
      Mode : 'downline',
      Cond1 : this.uplineForm.get('Cond1').value
    }
    this._apiService.uplinePost(object).then((res:any)=>{
      console.log(res);
      if(res.success){
        this.downlineList = res.returnValue;
      }
    })
  }

}
