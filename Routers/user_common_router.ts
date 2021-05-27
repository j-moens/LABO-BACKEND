import { Router} from 'express';
import { UserController } from '../Controllers/user_controller';

export class UserCommonRouter
{
    public router: Router;
    public authRouter: Router;

    constructor()
    {
        this.router = Router();
    
        this.router.get('/name/:name', UserController.getOneByName);
        this.router.get('/id/:id', UserController.getOneById);

        this.router.post('/create', UserController.createUsers);

        this.authRouter = Router();

        this.authRouter.put('/password', UserController.updateUserPassword);
        this.authRouter.put('/:id', UserController.updateConnectedUser);
        
    }
}
