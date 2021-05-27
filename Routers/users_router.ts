import { Router} from 'express';
import { UserController } from '../Controllers/user_controller';

export class UserRouter
{
    public router: Router;

    constructor()
    {
        this.router = Router();
    
        this.router.get('/', UserController.getAll);

        this.router.get('/:id', UserController.getOneById);

        this.router.post('/create', UserController.createUsers);

        this.router.get('/name/:name', UserController.getOneByName);

        this.router.delete('/:id', UserController.deleteUser);

        this.router.put('/:id', UserController.updateUser);

    }
}
