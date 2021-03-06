import { Observable } from "rxjs";
import { IProduct, Product } from "shared/models/product";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    return this.db.list("/products").push(product);
  }

  update(productId, product) {
    return this.db.object("/products/" + productId).update(product);
  }

  delete(productId) {
    return this.db.object("/products/" + productId).remove();
  }

  getAll() {
    return this.db
      .list("/products")
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.val();
            const $key = a.payload.key;
            return { $key, ...(data as IProduct) } as Product;
          });
        })
      );
  }

  get(productId) {
    return this.db
      .object("products/" + productId)
      .snapshotChanges()
      .pipe(
        map((actions) => {
          const $key = actions.payload.key;
          const data = actions.payload.val();
          return { $key, ...(data as IProduct) } as Product;
        })
      );
  }
}

//   getAll() {
//     return this.db
//       .list("/products")
//       .snapshotChanges()
//       .pipe(
//         map((actions) => {
//           return actions.map((a) => {
//             const data = a.payload.val();
//             const id = a.payload.key;
//             return { id, data };
//           });
//         })
//       );
//   }

//   get(productId) {
//     return this.db
//       .object("products/" + productId)
//       .snapshotChanges()
//       .pipe(
//         map((actions) => {
//           const id = actions.payload.key;
//           const data = actions.payload.val();
//           return { id, data };
//         })
//       );
//   }
// }
