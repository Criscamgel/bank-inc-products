import { createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading, openCart, closeCart } from './ui.actions';

export interface State {
    isLoading: boolean;
    openCart: boolean;
}

export const initialState: State = {
   isLoading: false,
   openCart: false,
}

const _uiReducer = createReducer(initialState,

    on(isLoading, state => ({ ...state, isLoading: true})),
    on(stopLoading, state => ({ ...state, isLoading: false})),
    on(openCart, state => ({ ...state, openCart: true})),
    on(closeCart, state => ({ ...state, openCart: false})),

); 

export function uiReducer(state:any, action:any) {
    return _uiReducer(state, action);
}