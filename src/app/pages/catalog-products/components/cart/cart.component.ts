import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { ICartProduct } from 'src/app/interfaces/cart.interfaces';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy  {

  cartSubscription: Subscription;
  cartProducts: ICartProduct[];

  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    this.cartSubscription = this.store.select('cart').subscribe(cartProducts => this.cartProducts = [...cartProducts.cartProducts]);
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}
