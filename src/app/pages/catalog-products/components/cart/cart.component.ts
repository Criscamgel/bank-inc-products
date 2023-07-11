import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { ICartProduct } from 'src/app/interfaces/cart.interfaces';
import * as ui from '../../../../shared/ui.actions';
import * as cartActions from '../../../../pages/catalog-products/components/cart/cart.actions';
import { DownloadFileService } from 'src/app/services/download.service';

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
  fields = ["id", "title", "price", "quantity", "description", "images"];

  constructor(
      private store: Store<AppState>, 
      private toastr: ToastrService,
      public downloadService:DownloadFileService
      ){}

  showToastSuccess(message: string, title: string) {
    this.toastr.success(message, title, {timeOut: 1500});
  }

  showToastInfo(message: string, title: string) {
    this.toastr.info(message, title, {timeOut: 1500});
  }

  eraseCartProduct(cartProduct:ICartProduct){
    this.cartProducts.splice(this.cartProducts.findIndex(function(x){
      return x.id === cartProduct.id;
    }), 1);
    this.store.dispatch(cartActions.setCartProducts({cartProducts:this.cartProducts}));
    this.showToastSuccess(`El producto ${cartProduct.title} fue eliminado correctamente`, '');
  }

  hideCart(){
    this.store.dispatch(ui.closeCart());
  }

  downloadFile(){
    if(this.cartProducts?.length){
      let cartsLocal = [];
      cartsLocal = [...this.cartProducts];
      return this.downloadService.downloadFile(cartsLocal)
    }else{
      this.showToastInfo(`El carrito esta vacío, no hay registros que descargar`, '');
    }
  }

  ngOnInit(): void {
    this.cartSubscription = this.store.select('cart').subscribe(cartProducts => this.cartProducts = [...cartProducts.cartProducts]);
    this.showCartSubscription = this.store.select('ui').subscribe(ui => this.showCart = ui.openCart);
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}
