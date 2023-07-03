import { createReducer, on } from '@ngrx/store';
import { IProduct } from 'src/app/interfaces/products.interfaces';
import { setProducts} from './products.actions';

export interface State {
    products: IProduct[] | null | any;
    product: IProduct | null | any;
}

export const initialState: State = {
   products: null,
   product: null
}

const _productsReducer = createReducer(initialState,

    on(setProducts, (state, { products }) => ({ ...state, products})),

);

export function productsReducer(state:any, action:any) {
    return _productsReducer(state, action);
}