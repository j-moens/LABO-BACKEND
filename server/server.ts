import * as express from 'express';
import * as https from 'https';
import * as fs from 'fs';
import * as cors from 'cors';
import { UserCommonRouter } from '../Routers/user_common.router';
import {UserRouter} from '../Routers/users_router'
import { ProductRouter } from '../Routers/products_router';


export class Server 
{
    private app: express.Application;
    private httpsServer: https.Server;
   

    constructor()
    {
        /*
        required : 
        npm install ts-node @types/express typescript
        */

        // create the application
        this.app = express();
        this.app.use(cors());
        // Body parser is now replaced by 'express'
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        this.init_routes();

       

    }
    private init_routes()
    {
        //this.app.use('/api/token');
        this.app.use('/api/users', new UserRouter().router);
        //this.app.use('/api/users-common', new UserCommonRouter().router); // usercommon router (create and get by username)
        this.app.use('/api/products', new ProductRouter().router);
    
    }
    public start()
    {
        
        this.app.listen(8000);
    }
}