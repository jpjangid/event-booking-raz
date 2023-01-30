import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer-style-one',
    templateUrl: './footer-style-one.component.html',
    styleUrls: ['./footer-style-one.component.scss']
})
export class FooterStyleOneComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    displayModal : boolean = false
    displayModal1 : boolean = false
    displayModal2 : boolean = false
  

}