import { AppUser } from "./../model/app-user";
import { AuthService } from "./../auth.service";
import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.css"],
})
export class BsNavbarComponent implements OnDestroy {
  appUser: AppUser;
  subscription: Subscription;
  constructor(private auth: AuthService) {
    this.subscription = auth.Appuser$.subscribe(
      (appuser) => (this.appUser = appuser)
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout() {
    this.auth.logout();
  }
}
