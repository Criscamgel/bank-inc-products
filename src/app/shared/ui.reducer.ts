import { createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading, openCart, closeCart, openModal, closeModal } from './ui.actions';

export interface State {
    isLoading: boolean;
    openCart: boolean;
    openModal: boolean;
}

export const initialState: State = {
   isLoading: false,
   openCart: false,
   openModal: false
}

const _uiReducer = createReducer(initialState,

    on(isLoading, state => ({ ...state, isLoading: true})),
    on(stopLoading, state => ({ ...state, isLoading: false})),
    on(openCart, state => ({ ...state, openCart: true})),
    on(closeCart, state => ({ ...state, openCart: false})),
    on(openModal, state => ({ ...state, openModal: true})),
    on(closeModal, state => ({ ...state, openModal: false})),

); 

export function uiReducer(state:any, action:any) {
    return _uiReducer(state, action);
}