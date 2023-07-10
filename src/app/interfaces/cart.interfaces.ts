
export interface ICartProduct {
    id:          number;
    title:       string;
    price:       number;
    quantity?:   number;
    description?: string;
    images:      string[];
}