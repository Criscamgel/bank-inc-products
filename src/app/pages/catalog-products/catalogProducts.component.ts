import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from "@ngrx/store";
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { AppState } from "../../app.reducer";
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-catalog-products',
  templateUrl: './catalogProducts.component.html',
  styleUrls: ['./catalogProducts.component.scss']
})
export class CatalogProductsComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  uiSubscription: Subscription;

  constructor(
    private router: Router, 
    private store: Store<AppState>,
    private productsService: ProductsService
    ){}

  ngOnInit(): void {
    //this.store.dispatch(ui.isLoading());
    this.productsService.getProducts();
    this.uiSubscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading)
  }
  
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

}
