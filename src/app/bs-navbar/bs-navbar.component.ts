import { ShoppingCart } from "./../model/shopping-cart";
import { AppUser } from "./../model/app-user";
import { AuthService } from "./../auth.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ShoppingCartService } from "../service/shopping-cart.service";
import { ShoppingCartItem } from "../model/shopping-cart-item";

@Component({
  selector: "bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.css"],
})
export class BsNavbarComponent implements OnDestroy, OnInit {
  appUser: AppUser;
  subscription: Subscription;
  cart$;
  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService
  ) {}
  async ngOnInit() {
    this.subscription = this.auth.Appuser$.subscribe(
      (appuser) => (this.appUser = appuser)
    );

    this.cart$ = await this.cartService.getCart();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout() {
    this.auth.logout();
  }
}
