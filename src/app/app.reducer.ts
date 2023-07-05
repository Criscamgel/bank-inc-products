import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as products from './pages/catalog-products/products.reducer';
import * as cart from './pages/catalog-products/components/cart/cart.reducer';


export interface AppState {
   ui: ui.State,
   products: products.State,
   cart: cart.State 
}

export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   products: products.productsReducer,
   cart: cart.cartReducer
}