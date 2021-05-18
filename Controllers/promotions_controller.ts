import { Router, Request, Response, NextFunction } from 'express';
import{Promotion, PromotionModel} from '../Models/promotions_model';

export class PromotionController
{
    //GET ALL
    public static async getAll(req: Request, res:Response, next: NextFunction)
    {
         const results =  await PromotionModel.getAll();
         res.json(results);
       
    }

    //GET ONE BY ID
    public static async getOneById(req: Request, res:Response, next: NextFunction)
    {
         const results =  await PromotionModel.getOneById(req.params.id);
         res.json(results);
       
    }

 

    //CREATE ( INSERT) - POST
    public static async createPromotions(req: Request, res:Response, next: NextFunction)
    {
        try{
            var promotion = new Promotion(req.body);

        const promotions =  await PromotionModel.insertPromotion(promotion);

        
        res.json(promotions);
        }catch(err)
        {
            res.status(500).send(err);
        }
    }

    //DELETE
    public static async deletePromotion(req: Request, res:Response, next: NextFunction)
    {
        try{

            const del = await PromotionModel.deletePromotionById(req.params.id);
            res.json(del);
        }
        catch(err)
        {
            res.status(500).send(err);
        }
    }

    //UPDATE-PUT
    public static async updatePromotion(req: Request, res:Response, next: NextFunction)
    {
        try{
            var promotion = new Promotion(req.body);
            const up = await PromotionModel.updatePromotionById(req.params.id, promotion);
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
    //      const results =  await UserModel.getOneByName(req.params.name);
    //      res.json(results);
       
    //     }
    // catch(err)
    //     {
    //     res.status(500).send(err);
    //     }
    // }



}
