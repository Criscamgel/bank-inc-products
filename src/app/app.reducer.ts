import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as products from './pages/catalog-products/products.reducer';


export interface AppState {
   ui: ui.State,
   products: products.State 
}

export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   products: products.productsReducer
}