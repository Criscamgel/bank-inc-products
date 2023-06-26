export interface IProduct {
    id:          number;
    title:       string;
    price:       number;
    description: string;
    images:      string[];
    creationAt:  Date;
    updatedAt:   Date;
    category:    ICategoryProduct;
}

export interface ICategoryProduct {
    id:         number;
    name:       string;
    image:      string;
    creationAt: Date;
    updatedAt:  Date;
}