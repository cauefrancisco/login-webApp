import { Injectable } from "@angular/core";
import {
  Router
} from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard {
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  canActivate(): boolean {
    if (this._authService.userIdentified) {
      return true;
    }
    this._router.navigateByUrl('login');
    return false;
  };
}
