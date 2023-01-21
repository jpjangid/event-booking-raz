import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-style-one',
  templateUrl: './navbar-style-one.component.html',
  styleUrls: ['./navbar-style-one.component.scss']
})
export class NavbarStyleOneComponent implements OnInit {

  constructor(private route : Router) { }

  email:any;

  password : any;

  ngOnInit(): void {
  }

  login() { 
    if(this.email && this.password ) {
      
    }
  }

  bookEvent() {
    this.route.navigateByUrl('');
  }

}
