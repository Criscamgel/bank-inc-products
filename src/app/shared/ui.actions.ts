import { createAction } from '@ngrx/store';

export const isLoading = createAction('[UI Component] IsLoading');
export const stopLoading = createAction('[UI Component] StopLoading');
export const openCart = createAction('[UI Component] OpenCart');
export const closeCart = createAction('[UI Component] CloseCart');