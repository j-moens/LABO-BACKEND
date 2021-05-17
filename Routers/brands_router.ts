import { Router} from 'express';
import { BrandController } from '../Controllers/brand_controller';

export class BrandRouter
{
    public router: Router;

    constructor()
    {
        this.router = Router();
    
        this.router.get('/', BrandController.getAll);

        this.router.get('/:id', BrandController.getOneById);

        this.router.post('/create', BrandController.createBrand);

        this.router.delete('/:id', BrandController.deleteBrand);

        this.router.put('/:id', BrandController.updateBrand);

    }
}
