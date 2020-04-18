import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { AppUser } from "shared/models/app-user";
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";
import { User } from "firebase";
import { pipe } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}

  save(user: User) {
    this.db.object("/users/" + user.uid).update({
      name: user.displayName,
      email: user.email,
    });
  }

  get(uid: string): AngularFireObject<AppUser> {
    return this.db.object("/users/" + uid);
  }
}
