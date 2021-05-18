import { Router} from 'express';
import { OrderController } from '../Controllers/order_controller';

export class OrderRouter
{
    public router: Router;

    constructor()
    {
        this.router = Router();
    
        this.router.get('/', OrderController.getAll);

        this.router.get('/:id', OrderController.getOneById);

        this.router.post('/create', OrderController.createOrder);

        this.router.delete('/:id', OrderController.deleteOrder);

        this.router.put('/:id', OrderController.updateOrder);

    }
}
