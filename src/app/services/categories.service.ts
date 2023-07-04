import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from '../app.reducer';
import * as productsActions from '../pages/catalog-products/products.actions';
import { baseServiceUrl } from '../apis/baseApi';
import { ICategory } from '../interfaces/categories.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient, private store: Store<AppState>) { }


  async getCategories():Promise<void>{
    this.http.get<ICategory[]>(`${baseServiceUrl}api/v1/categories`)
    .subscribe((resp) => {
      this.store.dispatch(productsActions.setCategories({categories:resp}))
    });

  }
  
}
