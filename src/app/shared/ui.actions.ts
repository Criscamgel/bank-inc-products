import { createAction } from '@ngrx/store';

export const isLoading = createAction('[UI Component] IsLoading');
export const stopLoading = createAction('[UI Component] StopLoading');
export const openCart = createAction('[UI Component] OpenCart');
export const closeCart = createAction('[UI Component] CloseCart');
export const openModal = createAction('[UI Component] OpenModal');
export const closeModal = createAction('[UI Component] CloseModal');