import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterContentChecked {

  public hidden: boolean = false;
  public userName = '';
  public isLogged!: boolean;


  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {
  }

  ngOnInit() {
    // setInterval(() => {
    //   this.hidden = !this.hidden;
    // }, 2000);
  }

  ngAfterContentChecked(): void {
    this.userName = this._authService.userNameDisplay;
    this.isLogged = this._authService.userIdentified;
  }

  public toggle(): boolean {
    return this.hidden = !this.hidden;

  }

  public logout(): void {
    this._authService.userIdentified = false;
    this._router.navigateByUrl('login');
  }

}
