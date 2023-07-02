import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IProduct } from '../../../../interfaces/products.interfaces';
export interface IAddProductCart {
  id: number | null;
  name: string | null,
  quantity: number,
  image: string | null
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  
  products: IProduct[] | null;
  showWidgetCart: boolean = false;
  productsSubscription: Subscription;
  addProductCart: IAddProductCart = {
    id: null,
    name: null,
    quantity: 0,
    image: null
  };

  constructor(
    private store: Store<AppState>
  ){}

  addQuantity() {
    this.addProductCart.quantity = this.addProductCart.quantity + 1; 
  }

  subtQuantity(){
    this.addProductCart.quantity = this.addProductCart.quantity - 1;
  }

  appearWidget(){
    this.showWidgetCart = !this.showWidgetCart;
    /* this.showWidgetCart = true; */
  }

  ngOnInit(): void{
    this.productsSubscription = this.store.select('products').subscribe(products => this.products = products.products);
  }

  ngOnDestroy():void{
    this.productsSubscription.unsubscribe();
  }

}
