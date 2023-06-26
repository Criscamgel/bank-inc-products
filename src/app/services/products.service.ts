import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/products.interfaces';
import { Store } from "@ngrx/store";
import { AppState } from '../app.reducer';
import * as productsActions from '../pages/catalog-products/products.actions';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private store: Store<AppState>) { }

 async getProducts():Promise<void> {
    this.http.get<IProduct[]>('https://api.escuelajs.co/api/v1/products')
    .subscribe((resp:any) => {
      this.store.dispatch(productsActions.setProducts(resp));
    });
 }
}
