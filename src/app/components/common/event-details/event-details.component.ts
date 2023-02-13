import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lib } from 'crypto-js';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  constructor(private router : Router , private activatedRoute : ActivatedRoute) { }

  data : any;
  displayModal : boolean = false;
  ngOnInit(): void {
    let data1 = this.activatedRoute.snapshot.params;
    if(data1.id){
     this.data =  this.packages.filter(res=> res.id == data1.id)
    }

    console.log(this.data);
  }

  images: any = {
    "data":[
        {
            "previewImageSrc": "assets/img/dubai.jfif",
            "thumbnailImageSrc": "assets/img/dubai.jfif",
            "name": '3N Dubai Best Deal',
            "price": 'INR 17,290'
        },
        {
            "previewImageSrc": "assets/img/dubai2.jpg",
            "thumbnailImageSrc": "assets/img/dubai2.jpg",
             "name": '3N Dubai Best Deal',
             "price": 'INR 17,290'
        },
        {
            "previewImageSrc": "assets/img/dubai3.jpg",
            "thumbnailImageSrc": "assets/img/dubai3.jpg",
             "name": '3N Dubai Best Deal',
             "price": 'INR 17,290'
        }
    ]
  }

  packages: any = [
    {
      id: 1,
      name: '3N Dubai Best Deal',
      price: '17290',
      images : this.images,
      night : '3 Nights',
      day : '4 Days',
      inclusion : [
        {li : 'Meet and Greet Assistance at the Airport by Adorn Tourism Representative'},
        {li : '3 Daily Buffet Breakfast at the Hotel'},
        {li : '3N Hotel Stay on mentioned Hotel(s)'},
        {li : 'Dubai Air Port Pick Up & Evening Dhow Cruise & Dinner @ Dubai Creek'},
        {li : 'Half Day Dubai City Tour with Approved Tourist Guide'},
        {li : 'Desert Safari @ Red Dunes,Lehbab Area - BBQ Dinner'},
        {li : 'Dubai Hotel Pick Up and Drop to Dubai Airport'},
        {li : 'All the above excursions or sightseeing Includes Entry tickets and You will be picked and dropped to Hotel(s)'},
        {li : 'Indian Govt Tax'}
      ]
    },
    {
      id: 2,
      name: '4N Dubai Luxury',
      price: '19180',
      images : this.images,
      night : '4 Nights',
      day : '5 Days',
      inclusion : [
        {li : 'Meet and Greet Assistance at the Airport by Adorn Tourism Representative'},
        {li : '4 Daily Buffet Breakfast at the Hotel'},
        {li : '4N Hotel Stay on mentioned Hotel(s)'},
        {li : 'Dubai Air Port Pick Up & Evening Dhow Cruise & Dinner @ Dubai Creek'},
        {li : 'Half Day Dubai City Tour with Approved Tourist Guide'},
        {li : 'Desert Safari @ Red Dunes,Lehbab Area - BBQ Dinner'},
        {li : 'Dubai Hotel Pick Up and Drop to Dubai Airport'},
        {li : 'All the above excursions or sightseeing Includes Entry tickets and You will be picked and dropped to Hotel(s)'},
        {li : 'Indian Govt Tax'}
      ]
    },
    {
      id: 3,
      name: '5N Dubai Masti',
      price: '23170',
      images : this.images,
      night : '5 Nights',
      day : '6 Days',
      inclusion : [
        {li : 'Meet and Greet Assistance at the Airport by Adorn Tourism Representative'},
        {li : '5 Daily Buffet Breakfast at the Hotel'},
        {li : '5N Hotel Stay on mentioned Hotel(s)'},
        {li : 'Dubai Air Port Pick Up & Evening Dhow Cruise & Dinner @ Dubai Creek'},
        {li : 'Half Day Dubai City Tour with Approved Tourist Guide'},
        {li : 'Desert Safari @ Red Dunes,Lehbab Area - BBQ Dinner'},
        {li : 'Dubai Hotel Pick Up and Drop to Dubai Airport'},
        {li : 'All the above excursions or sightseeing Includes Entry tickets and You will be picked and dropped to Hotel(s)'},
        {li : 'Indian Govt Tax'}
      ]
    },
    {
      id: 4,
      name: '3N Singapore Fun',
      price: '23800',
      images : this.images,
      night : '3 Nights',
      day : '4 Days',
      inclusion : [
        {li : 'Meet and Greet Assistance at the Airport by Adorn Tourism Representative'},
        {li : '3 Daily Buffet Breakfast at the Hotel'},
        {li : '3N Hotel Stay on mentioned Hotel(s)'},
        {li : 'Air port Pick up @ Changi International Air port'},
        {li : 'City Tour & Sentosa (One Way Cable Car,Luge & SkyRide,Wings of Time ** 2nd show)'},
        {li : 'Universal Studio @ Sentosa Island - Singapore'},
        {li : 'Day At Leisure on Your Own and Hotel Pick up and Drop to Changi Airport'},
        {li : 'All the above excursions or sightseeing Includes Entry tickets and You will be picked and dropped to Hotel(s)'},
        {li : 'Indian Govt Tax'}
      ]
    },
    {
      id: 5, 
      name: '4N Singapore Masti',
      price: '25410',
      images : this.images,
      night : '4 Nights',
      day : '5 Days',
      inclusion : [
        {li : 'Meet and Greet Assistance at the Airport by Adorn Tourism Representative'},
        {li : '4 Daily Buffet Breakfast at the Hotel'},
        {li : '4N Hotel Stay on mentioned Hotel(s)'},
        {li : 'Air port Pick up @ Changi International Air port'},
        {li : 'City Tour & Sentosa (One Way Cable Car,Luge & SkyRide,Wings of Time ** 2nd show)'},
        {li : 'Universal Studio @ Sentosa Island - Singapore'},
        {li : 'Day At Leisure on Your Own and Hotel Pick up and Drop to Changi Airport'},
        {li : 'All the above excursions or sightseeing Includes Entry tickets and You will be picked and dropped to Hotel(s)'},
        {li : 'Indian Govt Tax'}
      ]
    },
    // {
    //   id: 6, 
    //   name: '3N Bali Best Deal',
    //   price: 'INR 50,290',
    //   images : this.images,
    //   night : '3 Nights',
    //   day : '4 Days',
    //   inclusion : [
    //     {li : 'Meet and Greet Assistance at the Airport by Adorn Tourism Representative'},
    //     {li : '3 Daily Buffet Breakfast at the Hotel'},
    //     {li : '3N Hotel Stay on mentioned Hotel(s)'},
    //     {li : 'Air port Pick up @ Changi International Air port'},
    //     {li : 'City Tour & Sentosa (One Way Cable Car,Luge & SkyRide,Wings of Time ** 2nd show)'},
    //     {li : 'Universal Studio @ Sentosa Island - Singapore'},
    //     {li : 'Day At Leisure on Your Own and Hotel Pick up and Drop to Changi Airport'},
    //     
    //     {li : 'All the above excursions or sightseeing Includes Entry tickets and You will be picked and dropped to Hotel(s)'},
    //     {li : 'Indian Govt Tax'}
    //   ]
    // },
    {
      id: 7, 
      name: '5N Singapore Chill',
      price: '29050',
      images : this.images,
      night : '5 Nights',
      day : '6 Days',
      inclusion : [
        {li : 'Meet and Greet Assistance at the Airport by Adorn Tourism Representative'},
        {li : '5 Daily Buffet Breakfast at the Hotel'},
        {li : '5N Hotel Stay on mentioned Hotel(s)'},
        {li : 'Air port Pick up @ Changi International Air port'},
        {li : 'City Tour & Sentosa (One Way Cable Car,Luge & SkyRide,Wings of Time ** 2nd show)'},
        {li : 'Universal Studio @ Sentosa Island - Singapore'},
        {li : 'Day At Leisure on Your Own and Hotel Pick up and Drop to Changi Airport'},
        {li : 'All the above excursions or sightseeing Includes Entry tickets and You will be picked and dropped to Hotel(s)'},
        {li : 'Indian Govt Tax'}
      ]
    },
    {
      id: 8, 
      name: '5N Best of Bali',
      price: '50290',
      images : this.images,
      night : '5 Nights',
      day : '6 Days',
      inclusion : [
        {li : 'Meet and Greet Assistance at the Airport by Adorn Tourism Representative'},
        {li : '3 Daily Buffet Breakfast at the Hotel'},
        {li : '3N Hotel Stay on mentioned Hotel(s)'},
        {li : 'Air port Pick up @ Changi International Air port'},
        {li : 'City Tour & Sentosa (One Way Cable Car,Luge & SkyRide,Wings of Time ** 2nd show)'},
        {li : 'Universal Studio @ Sentosa Island - Singapore'},
        {li : 'Day At Leisure on Your Own and Hotel Pick up and Drop to Changi Airport'},
        {li : 'All the above excursions or sightseeing Includes Entry tickets and You will be picked and dropped to Hotel(s)'},
        {li : 'Indian Govt Tax'}
      ]
    },
    {
      id: 9, 
      name: '4N Malaysia Blast',
      price: '12740',
      images : this.images,
      night : '4 Nights',
      day : '5 Days',
      inclusion : [
        {li : 'Meet and Greet Assistance at the Airport by Adorn Tourism Representative'},
        {li : '3 Daily Buffet Breakfast at the Hotel'},
        {li : '3N Hotel Stay on mentioned Hotel(s)'},
        {li : 'Air port Pick up Kuala Lumpur and Day at Leisure'},
        {li : 'Kuala Lumpur Night Tour With Guide - With KL Tower Ticket'},
        {li : 'Day Trip to Genting Highland & Batu Caves (One way Cable Car is Included)'},
        {li : 'Day At Leisure on Your Own & Hotel Pick up and Drop to Kuala Lumpur AirPort'},
        {li : 'All the above excursions or sightseeing Includes Entry tickets and You will be picked and dropped to Hotel(s)'},
        {li : 'Indian Govt Tax'}
      ]
    }
  ]


  responsiveOptions:any[] = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '960px',
          numVisible: 4
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];

  routeToForm(data : any) {
    let object = {
      upline : 7,
      downline : ''
    }
    localStorage.setItem('uplineData' , JSON.stringify(object));
    let detailData : any = {
      price : data[0].price,
      name : data[0].name
    }
    localStorage.setItem('otherDetail', JSON.stringify(detailData));
    this.router.navigateByUrl('/registration');
  }

}
