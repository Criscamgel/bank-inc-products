import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/products.interfaces';
import { Store } from "@ngrx/store";
import { AppState } from '../app.reducer';
import * as productsActions from '../pages/catalog-products/products.actions';
import { baseServiceUrl } from '../apis/baseApi';
import * as ui from '../shared/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private store: Store<AppState>) { }

 async getProducts():Promise<void> {

    /* const params = new HttpParams()
    .set('name_param', value) */

    this.store.dispatch(ui.isLoading());
    this.http.get<IProduct[]>(`${baseServiceUrl}api/v1/products`/* , { params } */)
    .subscribe((resp) => {
      for(const element of resp) { 
        element.quantity = 0;
        element.viewWidget = false; 
      }
      this.store.dispatch(productsActions.setProducts({products:resp}));
      setTimeout(() => {
        this.store.dispatch(ui.stopLoading());
      }, 1000);
    });
 }
}
