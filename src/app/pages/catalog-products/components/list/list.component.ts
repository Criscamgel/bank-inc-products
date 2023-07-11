import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IProduct } from '../../../../interfaces/products.interfaces';
import * as productsActions from '../../../../pages/catalog-products/products.actions';
import * as cartActions from '../../../../pages/catalog-products/components/cart/cart.actions';
import * as uiActions from '../../../../shared/ui.actions';

import { ToastrService } from 'ngx-toastr';
import { ICartProduct } from 'src/app/interfaces/cart.interfaces';
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
  
  showModal: boolean;
  uiSubscription: Subscription;
  productModal: ICartProduct;
  cartProducts: ICartProduct[] = [];
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

  showModalMethod(product:ICartProduct){
    this.showModal = true;
    this.productModal = product;
    this.store.dispatch(uiActions.openModal());
  }

  showSuccess(message: string, title: string) {
    this.toastr.success(message, title, {timeOut: 1500});
  }

  showInfo(message: string, title: string, time?:number) {
    this.toastr.info(message, title, {timeOut: time});
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
    let { id, title, price, quantity, images, description } = product;
    let localCartProduct = {id, title, price, quantity, images, description};
    if(this.cartProducts.length && this.cartProducts.find(x => x.id === product.id)){
      this.appearProductWidget(product, false);     
      return this.showInfo('Producto agregado anteriormente, no se puede agregar al carrito', '', 2000);
    }
    this.cartProducts = [...this.cartProducts, localCartProduct];
    this.store.dispatch(cartActions.setCartProducts({cartProducts:this.cartProducts}));
    this.showSuccess('Producto agregado al carrito correctamente', '');
    this.appearProductWidget(product, false);
  }

  ngOnInit(){
    this.productsSubscription = this.store.select('products').subscribe(products => this.products = [...products.products]);
    this.uiSubscription = this.store.select('ui').subscribe(ui => this.showModal = ui.openModal);
  }

  ngOnDestroy():void{
    this.productsSubscription.unsubscribe();
  }

}
