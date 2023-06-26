import { createReducer, on } from '@ngrx/store';
import { IProduct } from 'src/app/interfaces/products.interfaces';
import { setProducts} from './products.actions';

export interface state {
    products: IProduct[] | null;
}

export const initialState: state = {
   products: null,
}

const _productsReducer = createReducer(initialState,

    on(setProducts, (state, { products }) => ({ ...state, products: products})),

); 

export function productsReducer(state:any, action:any) {
    return _productsReducer(state, action);
}