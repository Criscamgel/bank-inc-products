import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogProductsComponent } from './pages/catalog-products/catalogProducts.component';

const routes: Routes = [

  { path: '', component: CatalogProductsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
