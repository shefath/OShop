import { UserService } from "shared/services/user.service";
import { AuthService } from "shared/services/auth.service";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router
  ) {
    auth.user$.subscribe((user) => {
      if (!user) {
        return;
      }

      userService.save(user); //TODO: this type of saving user should be done in registration page

      const returnUrl = localStorage.getItem("returnUrl");
      if (!returnUrl) {
        return;
      }

      localStorage.removeItem("returnUrl");
      router.navigateByUrl(returnUrl);
    });
  }
}
