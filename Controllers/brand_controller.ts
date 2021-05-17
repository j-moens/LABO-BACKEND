import { Router, Request, Response, NextFunction } from 'express';
import{BrandModel, Brand} from '../Models/brand_model';

export class BrandController
{
    //GET ALL
    public static async getAll(req: Request, res:Response, next: NextFunction)
    {
         const results =  await BrandModel.getAll();
         res.json(results);
       
    }

    //GET ONE BY ID
    public static async getOneById(req: Request, res:Response, next: NextFunction)
    {
         const results =  await BrandModel.getOneById(req.params.id);
         res.json(results);
       
    }

 

    //CREATE ( INSERT) - POST
    public static async createBrand(req: Request, res:Response, next: NextFunction)
    {
        try{
            var brand = new Brand(req.body);

        const brands =  await BrandModel.insertBrand(brand);

        
        res.json(brands);
        }catch(err)
        {
            res.status(500).send(err);
        }
    }

    //DELETE
    public static async deleteBrand(req: Request, res:Response, next: NextFunction)
    {
        try{

            const del = await BrandModel.deleteBrandById(req.params.id);
            res.json(del);
        }
        catch(err)
        {
            res.status(500).send(err);
        }
    }

    //UPDATE-PUT
    public static async updateBrand(req: Request, res:Response, next: NextFunction)
    {
        try{
            var brand = new Brand(req.body);
            const up = await BrandModel.updateBrandById(req.params.id, brand);
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
