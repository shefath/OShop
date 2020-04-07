import { AppUser } from "./model/app-user";
import { UserService } from "./user.service";
import { AuthService } from "./auth.service";
import { RouterStateSnapshot, CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AdminAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private userService: UserService) {}

  canActivate(route, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.Appuser$.pipe(map((appUser: AppUser) => appUser.isAdmin));
  }
}
