import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { ICartProduct } from 'src/app/interfaces/cart.interfaces';
import { ICategory } from 'src/app/interfaces/categories.interfaces';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import * as ui from '../ui.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  cartSubscription: Subscription;
  cartProducts: ICartProduct[];
  categoriesSubscription: Subscription;
  categories: ICategory[];
  showCartSubscription: Subscription;
  showCart: boolean;

  constructor(
      private store: Store<AppState>,
      private categoriesService: CategoriesService,
      private productsService: ProductsService,
      ){}

  ngOnInit(): void {

    this.categoriesSubscription = this.store.select('products').subscribe(categories => this.categories = [...categories?.categories]);
    this.cartSubscription = this.store.select('cart').subscribe(cartProducts => this.cartProducts = [...cartProducts.cartProducts]);
    this.categoriesService.getCategories();

    let containerMenu = document.querySelector('.containerMenu');
    let btnMenuNav = document.querySelector('#btnMenuNav');
    let crossClosed = document.querySelector('#crossClosed');

    btnMenuNav?.addEventListener('click', () => {
      containerMenu?.classList.toggle('open');
    });

    crossClosed?.addEventListener('click', () => {
      containerMenu?.classList.remove('open');
    })

  }

  filterByCategory(id:number){
    this.productsService.getProductsByCategory(id);
  }

  isShowCart(){
    this.store.dispatch(ui.openCart());
  }

  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
  }

}
