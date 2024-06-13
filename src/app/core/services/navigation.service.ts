import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class NavigationService {
  private history: string[] = [];

  constructor(private _router: Router, private _location: Location) {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }

  back(): void {
    this.history.pop();
    if (this.history.length > 0) {
      this._location.back();
    } else {
      this._router.navigateByUrl("/");
    }
  }
}