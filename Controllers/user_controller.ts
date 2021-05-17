import { Router, Request, Response, NextFunction } from 'express';
import{UserModel, User} from '../Models/user_model';

export class UserController
{
    //GET ALL
    public static async getAll(req: Request, res:Response, next: NextFunction)
    {
         const results =  await UserModel.getAll();
         res.json(results);
       
    }

    //GET ONE BY ID
    public static async getOneById(req: Request, res:Response, next: NextFunction)
    {
         const results =  await UserModel.getOneById(req.params.id);
         res.json(results);
       
    }

 

    //CREATE ( INSERT) - POST
    public static async createUsers(req: Request, res:Response, next: NextFunction)
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
    public static async deleteUser(req: Request, res:Response, next: NextFunction)
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
    public static async updateUser(req: Request, res:Response, next: NextFunction)
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


    
    //GET ONE BY NAME
    // public static async getOneByName(req: Request, res:Response, next: NextFunction)
    // {
    //     try{
    //      const results =  await UserModel.getOneByName(req.params.name);
    //      res.json(results);
       
    //     }
    // catch(err)
    //     {
    //     res.status(500).send(err);
    //     }
    // }



}
