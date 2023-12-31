import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/products.interfaces';
import { Store } from "@ngrx/store";
import { AppState } from '../app.reducer';
import * as productsActions from '../pages/catalog-products/products.actions';
import { baseServiceUrl } from '../apis/baseApi';
import * as ui from '../shared/ui.actions';
import { ICategory } from '../interfaces/categories.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private store: Store<AppState>) { }

 async getProducts(filter?:string):Promise<void> {

    let urlGetProducts = filter ? `${baseServiceUrl}api/v1/products?title=${filter}` : `${baseServiceUrl}api/v1/products`; 
    this.store.dispatch(ui.isLoading());
    this.http.get<IProduct[]>(urlGetProducts)
    .subscribe((resp) => {
      for(const element of resp) { 
        element.quantity = 0;
        element.viewWidget = false; 
      }
      this.store.dispatch(productsActions.setProducts({products:resp}));
      setTimeout(() => {
        this.store.dispatch(ui.stopLoading());
      }, 500);
    });
  }

 async getProductsByCategory(category:number):Promise<void> {
  this.store.dispatch(ui.isLoading());
  this.http.get<IProduct[]>(`${baseServiceUrl}api/v1/products?categoryId=${category}`)
  .subscribe((resp) => {
    this.store.dispatch(productsActions.setProducts({products:resp}));
      setTimeout(() => {
        this.store.dispatch(ui.stopLoading());
      }, 500);
  })
 }

  async getCategories():Promise<void>{
    this.http.get<ICategory[]>(`${baseServiceUrl}api/v1/categories`)
    .subscribe((resp) => {
      this.store.dispatch(productsActions.setCategories({categories:resp}))
    });

  }
  
}
