export class Basket
{
    productBasket : string;
    quantityBasket : number;

    constructor(data: any)
    {
        this.productBasket = data.productBasket;
        this.quantityBasket = data.quantityBasket;
    }
}