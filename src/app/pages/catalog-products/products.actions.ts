import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../interfaces/products.interfaces';

export const setProducts = createAction(
        '[Products Component] SetProducts',
        props<{products: IProduct[]}>()
    );