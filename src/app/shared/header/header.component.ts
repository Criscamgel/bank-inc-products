import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { ICategory } from 'src/app/interfaces/categories.interfaces';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  categoriesSubscription: Subscription;
  categories: ICategory[];

  constructor(
      private store: Store<AppState>,
      private categoriesService: CategoriesService,
      private productsService: ProductsService,
      ){}

  ngOnInit(): void {

    this.categoriesService.getCategories();
    this.categoriesSubscription = this.store.select('products').subscribe(categories => this.categories = [...categories?.categories]);

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

  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
  }

}
