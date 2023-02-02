import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  images: any = {
    "data":[
        {
            "previewImageSrc": "assets/img/category/category1.jpg",
            "thumbnailImageSrc": "assets/img/category/category1.jpg",
            "name": '3N Dubai Best Deal',
            "price": 'INR 17,290'
        },
        {
            "previewImageSrc": "assets/img/blog/blog2.jpg",
            "thumbnailImageSrc": "assets/img/blog/blog2.jpg",
             "name": '3N Dubai Best Deal',
             "price": 'INR 17,290'
        },
        {
            "previewImageSrc": "assets/img/blog/blog3.jpg",
            "thumbnailImageSrc": "assets/img/blog/blog3.jpg",
            "name": '3N Dubai Best Deal',
            "price": 'INR 17,290'
        },
        {
            "previewImageSrc": "assets/img/category/category1.jpg",
            "thumbnailImageSrc": "assets/img/category/category4.jpg",
             "name": '3N Dubai Best Deal',
             "price": 'INR 17,290'
        },
        {
            "previewImageSrc": "assets/img/category/category1.jpg",
            "thumbnailImageSrc": "assets/img/category/category5.jpg",
             "name": '3N Dubai Best Deal',
             "price": 'INR 17,290'
        },
        {
            "previewImageSrc": "assets/img/category/category1.jpg",
            "thumbnailImageSrc": "assets/img/category/category1.jpg",
            "name": '3N Dubai Best Deal',
            "price": 'INR 17,290'
        }
    ]
  }

  packages: any = [
    {
      id: 1,
      image: 'assets/img/dubai/image1.jpg',
      name: '3N Dubai Best Deal',
      price: 'INR 20,290',
      images : this.images
    },
    {
      id: 2,
      image: 'assets/img/dubai/image1.jpg',
      name: '3N London Best Deal',
      price: 'INR 22,290',
      images : this.images
    },
    {
      id: 1,
      image: 'assets/img/dubai/image1.jpg',
      name: '3N Paris Best Deal',
      price: 'INR 25,290',
      images : this.images
    },
    {
      id: 1, 
      image: 'assets/img/dubai/image1.jpg',
      name: '3N Dubai Best Deal',
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
