import { Router} from 'express';
import { ModelController } from '../Controllers/model_controller';

export class ModelRouter
{
    public router: Router;

    constructor()
    {
        this.router = Router();
    
        this.router.get('/', ModelController.getAll);

        this.router.get('/:id', ModelController.getOneById);

        this.router.post('/create', ModelController.createModel);

        this.router.delete('/:id', ModelController.deleteModel);

        this.router.put('/:id', ModelController.updateModel);

    }
}
