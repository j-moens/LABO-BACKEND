import { Router, Request, Response, NextFunction } from 'express';
import{ProductModel, Product} from '../Models/product_model';

export class ProductController
{
    //GET ALL
    public static async getAll(req: Request, res:Response, next: NextFunction)
    {
         const results =  await ProductModel.getAll();
         res.json(results);
       
    }

    //GET ONE BY ID
    public static async getOneById(req: Request, res:Response, next: NextFunction)
    {
         const results =  await ProductModel.getOneById(req.params.id);
         res.json(results);
       
    }

 

    //CREATE ( INSERT) - POST
    public static async createProducts(req: Request, res:Response, next: NextFunction)
    {
        try{
            var user = new Product(req.body);

        const users =  await ProductModel.insertProduct(user);

        
        res.json(users);
        }catch(err)
        {
            res.status(500).send(err);
        }
    }

    //DELETE
    public static async deleteProduct(req: Request, res:Response, next: NextFunction)
    {
        try{

            const del = await ProductModel.deleteProductById(req.params.id);
            res.json(del);
        }
        catch(err)
        {
            res.status(500).send(err);
        }
    }

    //UPDATE-PUT
    public static async updateProduct(req: Request, res:Response, next: NextFunction)
    {
        try{
            var user = new Product(req.body);
            const up = await ProductModel.updateProductById(req.params.id, user);
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
