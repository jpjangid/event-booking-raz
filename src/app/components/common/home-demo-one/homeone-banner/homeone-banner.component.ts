import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-homeone-banner',
    templateUrl: './homeone-banner.component.html',
    styleUrls: ['./homeone-banner.component.scss']
})
export class HomeoneBannerComponent implements OnInit {

    constructor(private router : Router) { }

    ngOnInit(): void {
        this.resetOption = [this.options[0]];
    }

    banners : any = [{image : 'assets/img/sliderImage1'}];

    packages : any = [
        { id : 1, image : 'assets/img/dubai/image1.jpg' , name : '3N Dubai Best Deal', price : 'INR 17,290' },
        { id : 2, image : 'assets/img/dubai/image2.jpg' , name : '4N Dubai Luxury', price : 'INR 19,180' },
        { id : 3, image : 'assets/img/dubai/image3.jpg' , name : '5N Dubai Masti', price : 'INR 23,170' },
        { id : 4, image : 'assets/img/singapur/image1.jpg' , name : '3N Singapore Fun', price : 'INR 23,800' },
        { id : 5, image : 'assets/img/singapur/image2.jpg' , name : '4N Singapore Masti', price : 'INR 25,410' },
        { id : 6, image : 'assets/img/singapur/image3.jpg' , name : '3N Bali Best Deal', price : 'INR 5,530' },
        { id : 7, image : 'assets/img/thailand/image1.jpg' , name : '5N Singapore Chill', price : 'INR 29,050' },
        { id : 8, image : 'assets/img/thailand/image2.jpg' , name : '5N Best of Bali', price : 'INR 8,960' },
        { id : 9, image : 'assets/img/thailand/image3.jpg' , name : '4N Malaysia Blast', price : 'INR 12,740' }
    ]

    mainBannerContent = [
        {
            title: 'Find Nearby',
            paragraph: 'Expolore top-rated attractions, activities and more...',
            popularSearchList: [
                {
                    title: 'Restaurants',
                    link: 'grid-listings-left-sidebar'
                },
                {
                    title: 'Events',
                    link: 'grid-listings-left-sidebar'
                },
                {
                    title: 'Clothing',
                    link: 'grid-listings-left-sidebar'
                },
                {
                    title: 'Bank',
                    link: 'grid-listings-left-sidebar'
                },
                {
                    title: 'Fitness',
                    link: 'grid-listings-left-sidebar'
                },
                {
                    title: 'Bookstore',
                    link: 'grid-listings-left-sidebar'
                }
            ]
        }
    ]

    // Category Select
    singleSelect: any = [];
    multiSelect: any = [];
    stringArray: any = [];
    objectsArray: any = [];
    resetOption: any;
    config = {
        displayKey: "name",
        search: true
    };
    options = [
        // Type here your category name
        {
            name: "Restaurants",
        },
        {
            name: "Events",
        },
        {
            name: "Clothing",
        },
        {
            name: "Bank",
        },
        {
            name: "Fitness",
        },
        {
            name: "Bookstore",
        }
    ];
    searchChange($event) {
        console.log($event);
    }
    reset() {
        this.resetOption = [];
    }

    bookEvent() {
        this.router.navigateByUrl('/customerBooking');
      }

}