import { Router} from 'express';
import { DetailsPhoneController } from '../Controllers/details_phone_controller';

export class DetailsPhoneRouter
{
    public router: Router;

    constructor()
    {
        this.router = Router();
        
        this.router.get('/', DetailsPhoneController.getAll);

        this.router.get ('/fk_products/:id', DetailsPhoneController.getOneByProductId) // on prend le getOneByProductId -> pour détails phone dans le front
 
        this.router.get('/:id', DetailsPhoneController.getOneById);

        this.router.post('/create', DetailsPhoneController.createDetailsPhone);

        this.router.delete('/:id', DetailsPhoneController.deleteDetailsPhone);

        this.router.put('/:id', DetailsPhoneController.updateDetailsPhone);

      

    }
}
