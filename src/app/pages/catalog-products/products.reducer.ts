import { createReducer, on } from '@ngrx/store';
import { ICategory } from 'src/app/interfaces/categories.interfaces';
import { IProduct } from 'src/app/interfaces/products.interfaces';
import { setCategories, setProducts} from './products.actions';

export interface State {
    products: IProduct[] | null | any;
    categories: ICategory[] | null | any;
}

export const initialState: State = {
   products: null,
   categories: null,
}

const _productsReducer = createReducer(initialState,

    on(setProducts, (state, { products }) => ({ ...state, products})),
    on(setCategories, (state, { categories }) => ({ ...state, categories})),

);

export function productsReducer(state:any, action:any) {
    return _productsReducer(state, action);
}