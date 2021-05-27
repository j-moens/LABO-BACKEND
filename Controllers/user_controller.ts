import { Router, Request, Response, NextFunction } from 'express';
import{UserModel, User} from '../Models/user_model';

export namespace UserController
{
    //GET ALL
    export async function getAll(req: Request, res:Response, next: NextFunction)
    {
         const results =  await UserModel.getAll();
         res.json(results);
       
    }

    //GET ONE BY ID
    export async function getOneById(req: Request, res:Response, next: NextFunction)
    {
         const results =  await UserModel.getOneById(req.params.id);
         res.json(results);
       
    }

      //GET ONE BY NAME
      export async function getOneByName(req: Request, res:Response, next: NextFunction)
      {
          try{
           const results =  await UserModel.getOneByName(req.params.name);
           res.json(results);
         
          }
      catch(err)
          {
          res.status(500).send(err);
          }
      }

      //GET ONE BY EMAIL

      export async function getOneByEmail(req: Request, res: Response, next: NextFunction)
      {
          try
          {
              const results = await UserModel.getOneByEmail(req.params.email);
              res.json(results);
          } catch(err)
          {
              res.status(500).send(err);
          }
      }
 

    //CREATE ( INSERT) - POST
    export async function createUsers(req: Request, res:Response, next: NextFunction)
    {
        try{
            var user = new User(req.body);

        const users =  await UserModel.insertUser(user);

        
        res.json(users);
        }catch(err)
        {
            res.status(500).send(err);
        }
    }

    //DELETE
    export async function deleteUser(req: Request, res:Response, next: NextFunction)
    {
        try{

            const del = await UserModel.deleteUserById(req.params.id);
            res.json(del);
        }
        catch(err)
        {
            res.status(500).send(err);
        }
    }

    //UPDATE-PUT
    export async function updateUser(req: Request, res:Response, next: NextFunction)
    {
        try{
            var user = new User(req.body);
            const up = await UserModel.updateUserById(req.params.id, user);
            res.json(up);
        }
        catch(err)
        {
            res.status(500).send(err);
        }
    }

    //update password

    export async function updateUserPassword(req, res: Response, next: NextFunction)
    {
        try
        {
            const user = new User(req.body);
            const email = req.decoded.email;
            if(email === user.email)
            {
                const results = await UserModel.updatePassword(user);
                res.json(results);
            } else 
            {
                res.status(403).send({
                    success: false,
                    message: 'You can\'t change that user.'
                });
            }
        } catch(err)
        {
            res.status(500).send(err);
        }
    }

    //updateCOnnectedUser

    export async function updateConnectedUser(req, res: Response, next: NextFunction)
    {
        try
        {
            // Get with :id from DB
            const result = await UserModel.getOneById(req.params.id);
            const user = new User(result[0]);
            const updatedUser = new User(req.body);
            // Get the username from the token
            const email = req.decoded.email;

            if(email === user.email)
            {
                const results = await UserModel.updateUserById(req.params.id, updatedUser);
                res.json(results);
            } else 
            {
                res.status(403).send({
                    success: false,
                    message: 'You can\'t change that user.'
                });
            }
        } catch(err)
        {
            res.status(500).send(err);
        }
    }


    
  



}
