import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public hidden!: boolean;


  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.hidden = !this.hidden;
    }, 2000);
  }

  public toggle(): void {
    this.hidden = !this.hidden;

  }

}
