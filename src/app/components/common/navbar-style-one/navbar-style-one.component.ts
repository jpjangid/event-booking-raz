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
  userId : any = '';

  loginForm = this.fb.group({
    loginName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })


  ngOnInit(): void {
    let id = localStorage.getItem('eventUser');
    if(id){
      this.userId =  JSON.parse(id)?.upLineId;
    }

    console.log(this.userId);
  }

  loginFunction(login : NgForm) { 
    if(this.loginForm.valid){
      this._apiService.login(this.loginForm.value).then((res:any)=>{
        console.log(res);
        if(res.success){
          localStorage.setItem('eventUser' , JSON.stringify(res.returnValue));
          // this.router.navigateByUrl('/dashboard');
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/dashboard']);
        }
      })
    }
  }

  bookEvent() {
    this.router.navigateByUrl('/customerBooking');
  }

  logOut(){
    localStorage.removeItem('eventUser');
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/']);
  }

}
