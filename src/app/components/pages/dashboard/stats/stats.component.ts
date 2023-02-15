import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  @Input() counter : any;
  constructor() { }

  ngOnInit(): void {
    // console.log(this.counter);
  }

}
