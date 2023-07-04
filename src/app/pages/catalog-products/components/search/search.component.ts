import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  constructor(private productsService: ProductsService){}

  getFilterProducts(filter:string){
    this.productsService.getProducts(filter);
  }

}
