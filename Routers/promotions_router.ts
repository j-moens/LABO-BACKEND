import { Router} from 'express';
import { PromotionController } from '../Controllers/promotions_controller';

export class PromotionRouter
{
    public router: Router;

    constructor()
    {
        this.router = Router();
    
        this.router.get('/', PromotionController.getAll);

        this.router.get('/:id', PromotionController.getOneById);

        this.router.post('/create', PromotionController.createPromotions);

        this.router.delete('/:id', PromotionController.deletePromotion);

        this.router.put('/:id', PromotionController.updatePromotion);

    }
}
