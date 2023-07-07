import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { ICartProduct } from 'src/app/interfaces/cart.interfaces';
import * as ui from '../../../../shared/ui.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy  {

  cartSubscription: Subscription;
  cartProducts: ICartProduct[];
  showCartSubscription: Subscription;
  showCart: Boolean;

  constructor(private store: Store<AppState>){}

  eraseCartProduct(cartProduct:ICartProduct){
    console.log(cartProduct);
    
  }

  hideCart(){
    this.store.dispatch(ui.closeCart());
  }

  ngOnInit(): void {
    this.cartSubscription = this.store.select('cart').subscribe(cartProducts => this.cartProducts = [...cartProducts.cartProducts]);
    this.showCartSubscription = this.store.select('ui').subscribe(ui => this.showCart = ui.openCart);
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}
