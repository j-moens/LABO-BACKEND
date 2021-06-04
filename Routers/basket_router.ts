import { Router} from 'express';
import { BasketController } from '../Controllers/basket_controller';
import { Basket } from '../Models/basket_model';

export class BasketRouter
{
    public router: Router;

    constructor()
    {
        this.router = Router();

        this.router.get('/basket', (req, res, next) => {
        if(!sessionStorage.cart){
        return res.json('basket is empty!');
        }else
        {
          
        }
        var cart = new Basket(sessionStorage.cart);
      //  console.log(req.session.cart);
        res.status(200).json(cart)
    });

    

    }
}
