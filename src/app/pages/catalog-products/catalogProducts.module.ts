import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { ListComponent } from './components/list/list.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';



@NgModule({
  declarations: [
    SearchComponent,
    ListComponent,
    ListCategoryComponent,
  ],
  exports: [
    SearchComponent,
    ListComponent,
    ListCategoryComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class CatalogProductsModule { }
