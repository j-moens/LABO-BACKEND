import { Router, Request, Response, NextFunction } from 'express';
import{ModelModel, Model} from '../Models/model_model';

export class ModelController
{
    //GET ALL
    public static async getAll(req: Request, res:Response, next: NextFunction)
    {
         const results =  await ModelModel.getAll();
         res.json(results);
       
    }

    //GET ONE BY ID
    public static async getOneById(req: Request, res:Response, next: NextFunction)
    {
         const results =  await ModelModel.getOneById(req.params.id);
         res.json(results);
       
    }

 

    //CREATE ( INSERT) - POST
    public static async createModel(req: Request, res:Response, next: NextFunction)
    {
        try{
            var model = new Model(req.body);

        const models =  await ModelModel.insertModel(model);

        
        res.json(models);
        }catch(err)
        {
            res.status(500).send(err);
        }
    }

    //DELETE
    public static async deleteModel(req: Request, res:Response, next: NextFunction)
    {
        try{

            const del = await ModelModel.deleteModelById(req.params.id);
            res.json(del);
        }
        catch(err)
        {
            res.status(500).send(err);
        }
    }

    //UPDATE-PUT
    public static async updateModel(req: Request, res:Response, next: NextFunction)
    {
        try{
            var model = new Model(req.body);
            const up = await ModelModel.updateModelById(req.params.id, model);
            res.json(up);
        }
        catch(err)
        {
            res.status(500).send(err);
        }
    }


    
    // GET ONE BY NAME
    // public static async getOneByName(req: Request, res:Response, next: NextFunction)
    // {
    //     try{
    //      const results =  await ModelModel.getOneByName(req.params.name);
    //      res.json(results);
       
    //     }
    // catch(err)
    //     {
    //     res.status(500).send(err);
    //     }
    // }



}
