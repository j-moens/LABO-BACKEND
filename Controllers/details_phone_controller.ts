import { Router, Request, Response, NextFunction } from 'express';
import{DetailsPhone, DetailsPhoneModel} from '../Models/details_phone_model';

export class DetailsPhoneController
{
    //GET ALL
    public static async getAll(req: Request, res:Response, next: NextFunction)
    {
         const results =  await DetailsPhoneModel.getAll();
         res.json(results);
       
    }

    //GET ONE BY ID
    public static async getOneById(req: Request, res:Response, next: NextFunction)
    {
         const results =  await DetailsPhoneModel.getOneById(req.params.id);
         res.json(results);
       
    }

 

    //CREATE ( INSERT) - POST
    public static async createDetailsPhone(req: Request, res:Response, next: NextFunction)
    {
        try{
            var details_phone = new DetailsPhone(req.body);

        const details_phones =  await DetailsPhoneModel.insertDetailsPhone(details_phone);

        
        res.json(details_phones);
        }catch(err)
        {
            res.status(500).send(err);
        }
    }

    //DELETE
    public static async deleteDetailsPhone(req: Request, res:Response, next: NextFunction)
    {
        try{

            const del = await DetailsPhoneModel.deleteDetailsPhoneById(req.params.id);
            res.json(del);
        }
        catch(err)
        {
            res.status(500).send(err);
        }
    }

    //UPDATE-PUT
    public static async updateDetailsPhone(req: Request, res:Response, next: NextFunction)
    {
        try{
            var details_phone = new DetailsPhone(req.body);
            const up = await DetailsPhoneModel.updateDetailsPhoneById(req.params.id, details_phone);
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
    //      const results =  await brandModel.getOneByName(req.params.name);
    //      res.json(results);
       
    //     }
    // catch(err)
    //     {
    //     res.status(500).send(err);
    //     }
    // }



}
