import { Router} from 'express';
import { ProductController } from '../Controllers/product_controller';

export class ProductRouter
{
    public router: Router;

    constructor()
    {
        this.router = Router();
    
        this.router.get('/', ProductController.getAll);

        this.router.get('/:id', ProductController.getOneById);

        this.router.post('/create', ProductController.createProducts);

        this.router.delete('/:id', ProductController.deleteProduct);

        this.router.put('/:id', ProductController.updateProduct);

    }
}
