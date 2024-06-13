import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    private navigation: NavigationService,
  ) { }

  ngOnInit() {
  }

  back(): void {
    this.navigation.back()
  }

}
