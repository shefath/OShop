import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth, User } from "firebase";
import { Observable } from "rxjs";
import { empty, of } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { AppUser } from "shared/models/app-user";
import { UserService } from "./user.service";
import { switchMap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute
  ) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
    returnUrl = returnUrl ? returnUrl : "/";
    localStorage.setItem("returnUrl", returnUrl);

    this.afAuth.signInWithRedirect(new auth.GoogleAuthProvider());
    console.log("**** after login ***", this.afAuth.authState);
  }

  logout() {
    this.afAuth.signOut();
    console.log("*** logged out", this.afAuth.authState);
  }

  get authState() {
    return this.afAuth.authState;
  }

  get Appuser$(): Observable<AppUser> {
    // return this.user$.pipe(switchMap((user) => this.userService.get(user.uid)));
    return this.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.userService.get(user.uid).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
}
