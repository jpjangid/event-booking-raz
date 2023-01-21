import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-navbar-style-one',
  templateUrl: './navbar-style-one.component.html',
  styleUrls: ['./navbar-style-one.component.scss']
})
export class NavbarStyleOneComponent implements OnInit {

  constructor(private _apiService : ApiService , private fb : FormBuilder , private router : Router) { }


  loginForm = this.fb.group({
    loginName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })


  ngOnInit(): void {
  }

  loginFunction(login : NgForm) { 
    console.log(this.loginForm.valid , this.loginForm.value);
    this._apiService.login(this.loginForm.value).then((res:any)=>{
      console.log(res);
      localStorage.setItem('eventUser' , JSON.stringify(res.returnValue));
      this.router.navigateByUrl('/dashboard')
    })
  }

  bookEvent() {
    this.router.navigateByUrl('/customerBooking');
  }

}
