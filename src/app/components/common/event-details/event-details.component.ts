import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  constructor(private router : Router , private activatedRoute : ActivatedRoute) { }

  data : any;
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
      price: 'INR 20,290',
      images : this.images
    },
    {
      id: 2,
      name: '4N Dubai Luxury',
      price: 'INR 20,290',
      images : this.images
    },
    {
      id: 3,
      name: '5N Dubai Masti',
      price: 'INR 22,290',
      images : this.images
    },
    {
      id: 4,
      name: '3N Singapore Fun',
      price: 'INR 25,290',
      images : this.images
    },
    {
      id: 5, 
      name: '4N Singapore Masti',
      price: 'INR 50,290',
      images : this.images
    },
    {
      id: 6, 
      name: '3N Bali Best Deal',
      price: 'INR 50,290',
      images : this.images
    },
    {
      id: 7, 
      name: '5N Singapore Chill',
      price: 'INR 50,290',
      images : this.images
    },
    {
      id: 8, 
      name: '5N Best of Bali',
      price: 'INR 50,290',
      images : this.images
    },
    {
      id: 9, 
      name: '4N Malaysia Blast',
      price: 'INR 50,290',
      images : this.images
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

}
