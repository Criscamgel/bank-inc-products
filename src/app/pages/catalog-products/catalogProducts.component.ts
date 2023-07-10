import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from "@ngrx/store";
import { Observable, Subscription } from 'rxjs';
import { IProduct } from 'src/app/interfaces/products.interfaces';
import { ProductsService } from 'src/app/services/products.service';
import { AppState } from "../../app.reducer";
@Component({
  selector: 'app-catalog-products',
  templateUrl: './catalogProducts.component.html',
  styleUrls: ['./catalogProducts.component.scss']
})

export class CatalogProductsComponent implements OnInit, OnDestroy {

  loading: boolean;
  uiSubscription: Subscription;
  productsObservable: Observable<IProduct[]>;
  products: IProduct[];
  productsSubscription: Subscription;
  imageObject: Array<object> = [];

  constructor(
    private store: Store<AppState>,
    private productsService: ProductsService,
    ){}

  conformImageObject(){
    if(this.products){
      for (let index = 0; index < 10; index++) {
        let elementSlider = 
        { 
          image: this.products[index].images[0],
          thumbImage: this.products[index].images[0],
          title: this.products[index].title
        }
        this.imageObject.push(elementSlider);
      }
    }
  }

  async ngOnInit(): Promise<void> {
    await this.productsService.getProducts();
    this.productsSubscription = this.store.select('products').subscribe(products => this.products = [...products.products]);
    this.uiSubscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
    setTimeout(() => {
      this.conformImageObject();
    }, 1000);
  }
  
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
    this.productsSubscription.unsubscribe();
  }

}
