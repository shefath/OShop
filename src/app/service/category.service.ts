import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getCategories() {
    return this.db
      .list("/categories", (ref) => {
        return ref.orderByChild("name");
      })
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.val();
            const key = a.payload.key;
            return { key, data };
          });
        })
      );
  }
}
