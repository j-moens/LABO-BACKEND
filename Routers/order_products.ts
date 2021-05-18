import { Router} from 'express';
import { OrderProductsController } from '../Controllers/order_products_controller';

export class OrderProductRouter
{
    public router: Router;

    constructor()
    {
        this.router = Router();
    
        this.router.get('/', OrderProductsController.getAll);

        this.router.get('/:id', OrderProductsController.getOneById);

        this.router.post('/create', OrderProductsController.createOrderProduct);

        this.router.delete('/:id', OrderProductsController.deleteOrderProduct);

        this.router.put('/:id', OrderProductsController.updateOrderProduct);

    }
}
