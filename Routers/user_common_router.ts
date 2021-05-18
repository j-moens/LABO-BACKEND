import { Router} from 'express';
import { UserController } from '../Controllers/user_controller';

export class UserCommonRouter
{
    public router: Router;

    constructor()
    {
        this.router = Router();
    
        this.router.get('/name/:name', UserController.getOneByName);

        this.router.post('/create', UserController.createUsers);
        
    }
}
