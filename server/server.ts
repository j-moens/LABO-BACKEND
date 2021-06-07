import * as express from 'express';
import * as https from 'https';
import * as fs from 'fs';
import * as cors from 'cors';
import { UserCommonRouter } from '../Routers/user_common_router';
import {UserRouter} from '../Routers/users_router'
import { ProductRouter } from '../Routers/products_router';
import { BrandRouter } from '../Routers/brands_router';
import { ModelRouter } from '../Routers/model_router';
import { DetailsPhoneRouter } from '../Routers/details_phone_router';
import { PromotionRouter } from '../Routers/promotions_router';
import { OrderProductRouter } from '../Routers/order_products';
import { OrderRouter } from '../Routers/order_router';
import { AuthentificationRouter } from '../Routers/authentification_router';
import * as session from "express-session";
import { BasketRouter } from '../Routers/basket_router';


export class Server 
{
    private app: express.Application;
    private httpsServer: https.Server;
    
   
    constructor()
    {
      
        var session = require('express-session');

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

        // for session storage for basket
        this.app.use(session({
          secret: 'my secret',
          resave: true,
          saveUninitialized: true,
          cookie : {secure : true}
      }));

  


        this.init_routes();

        /*
        GENERATE CERTIFICATE : 
            - openssl.exe genrsa -out certificate/private.pem 2048
            - openssl.exe rsa -in certificate/private.pem -outform PEM -pubout -out certificate/public.pem
            - openssl req -new -key certificate/private.pem -out certificate/certificate.csr
            - openssl x509 -req -days 365 -in certificate/certificate.csr -signkey certificate/private.pem -out certificate/certificate.crt
        */
            let key = fs.readFileSync('certificate/private.pem', 'utf8');
            let certif = fs.readFileSync('certificate/certificate.crt', 'utf8');
            let credentials = { key: key, cert: certif };
            this.httpsServer = https.createServer(credentials, this.app);
    }

    

    private init_routes()
    {

       
        this.app.use('/api/token', new AuthentificationRouter().router);
        this.app.use('/api/users-common', new UserCommonRouter().router); // usercommon router (create and get by username)
        this.app.use('/api/products', new ProductRouter().router);
        this.app.use('/api/brands', new BrandRouter().router);
        this.app.use('/api/models', new ModelRouter().router);
        this.app.use('/api/details_phone', new DetailsPhoneRouter().router);
        this.app.use('/api/promotions', new PromotionRouter().router);
        this.app.use('/api/order_products', new OrderProductRouter().router);
        this.app.use('/api/orders', new OrderRouter().router);
       
         this.app.use('/api/basket', new BasketRouter().router);
       
      
        this.app.use(AuthentificationRouter.checkAuthorization);  // require authenification from here
        this.app.use('/api/users-common', new UserCommonRouter().authRouter);
        this.app.use(AuthentificationRouter.checkAdmin);  // require admin privileges from here

        this.app.use('/api/users', new UserRouter().router);

    
    }

    

    public start()
    {
        
               // run with http
        //this.app.listen(8000);

        // run with https
        this.httpsServer.listen(8000);
    }
}