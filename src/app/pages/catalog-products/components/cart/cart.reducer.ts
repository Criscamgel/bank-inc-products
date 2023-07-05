import { createReducer, on } from '@ngrx/store';
import { ICartProduct } from 'src/app/interfaces/cart.interfaces';
import { setCartProducts } from './cart.actions';

export interface State {
    cartProducts: ICartProduct[] | null | any;
}

export const initialState: State = {
   cartProducts: null,
}

const _productsReducer = createReducer(initialState,

    on(setCartProducts, (state, { cartProducts }) => ({ ...state, cartProducts})),

);

export function cartReducer(state:any, action:any) {
    return _productsReducer(state, action);
}