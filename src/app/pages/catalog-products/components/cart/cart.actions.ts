import { createAction, props } from '@ngrx/store';
import { ICartProduct } from 'src/app/interfaces/cart.interfaces';

export const setCartProducts = createAction(
        '[Cart Component] SetCartProducts',
        props<{cartProducts: ICartProduct[]}>()  
    );