import { createAction, props } from '@ngrx/store';
import { ICategory } from 'src/app/interfaces/categories.interfaces';
import { IProduct } from '../../interfaces/products.interfaces';

export const setProducts = createAction(
        '[Products Component] SetProducts',
        props<{products: IProduct[]}>()  
    );

export const setCategories = createAction(
    '[Products Component] SetCategories',
    props<{categories: ICategory[]}>()  
);