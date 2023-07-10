import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { ListComponent } from './components/list/list.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { ToastrModule } from 'ngx-toastr';
import { CartComponent } from './components/cart/cart.component';
import { ModalComponent } from 'src/app/pages/catalog-products/components/modal/modal.component';

@NgModule({
  declarations: [
    SearchComponent,
    ListComponent,
    ListCategoryComponent,
    CartComponent,
    ModalComponent,
  ],
  exports: [
    SearchComponent,
    ListComponent,
    ListCategoryComponent,
    CartComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot()
  ]
})
export class CatalogProductsModule { }
