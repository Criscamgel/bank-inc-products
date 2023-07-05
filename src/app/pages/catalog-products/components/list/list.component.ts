import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IProduct } from '../../../../interfaces/products.interfaces';
import * as productsActions from '../../../../pages/catalog-products/products.actions';
import * as cartActions from '../../../../pages/catalog-products/components/cart/cart.actions';

import { ToastrService } from 'ngx-toastr';
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
  
  products: IProduct[];
  productLocal: IProduct;
  showWidgetCart: boolean = false;
  productsSubscription: Subscription;
  addProductCart: IAddProductCart = {
    id: null,
    name: null,
    quantity: 0,
    image: null
  };

  constructor(
    private store: Store<AppState>,
    private toastr: ToastrService
  ){}

  showSuccess(message: string, title: string) {
    this.toastr.success(message, title);
  }

  appearProductWidget(product:IProduct, bool: boolean){
    this.productLocal = {...product};
    this.productLocal.viewWidget = bool;
    if(bool == false){
      this.productLocal.quantity = 0;
    }
    let foundIndex = this.products.findIndex(x => x.id == this.productLocal.id);
    this.products[foundIndex] = this.productLocal;
    this.store.dispatch(productsActions.setProducts({products:this.products}));
  }

  modifyProductQuantity(product:IProduct, operation:string){
    this.productLocal = {...product};
    if(operation == 'sum'){
      // @ts-ignore
      this.productLocal.quantity = this.productLocal?.quantity + 1; 
    }
    if(operation == 'sub'){
      // @ts-ignore
      this.productLocal.quantity = this.productLocal?.quantity - 1;
    }
    let foundIndex = this.products.findIndex(x => x.id == this.productLocal.id);
    this.products[foundIndex] = this.productLocal;
    this.store.dispatch(productsActions.setProducts({products:this.products}));
  }

  addToCartProduct(product:IProduct){
    let cartProducts = [];
    let { id, title, price, quantity } = product;
    cartProducts.push({id, title, price, quantity});
    this.store.dispatch(cartActions.setCartProducts({cartProducts:cartProducts}));
    this.showSuccess('Producto agregado al carrito correctamente', '');
  }

  ngOnInit(){
    this.productsSubscription = this.store.select('products').subscribe(products => this.products = [...products?.products]);
  }

  ngOnDestroy():void{
    this.productsSubscription.unsubscribe();
  }

}
