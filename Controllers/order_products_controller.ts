import { Router, Request, Response, NextFunction } from 'express';
import{OrderProduct, OrderProductModel} from '../Models/order_products_model';

export class OrderProductsController
{
    //GET ALL
    public static async getAll(req: Request, res:Response, next: NextFunction)
    {
         const results =  await OrderProductModel.getAll();
         res.json(results);
       
    }

    //GET ONE BY ID
    public static async getOneById(req: Request, res:Response, next: NextFunction)
    {
         const results =  await OrderProductModel.getOneById(req.params.id);
         res.json(results);
       
    }

 

    //CREATE ( INSERT) - POST
    public static async createOrderProduct(req: Request, res:Response, next: NextFunction)
    {
        try{
            var order_product = new OrderProduct(req.body);

        const order_products =  await OrderProductModel.insertOrderProduct(order_product);

        
        res.json(order_products);
        }catch(err)
        {
            res.status(500).send(err);
        }
    }

    //DELETE
    public static async deleteOrderProduct(req: Request, res:Response, next: NextFunction)
    {
        try{

            const del = await OrderProductModel.deleteOrderProductById(req.params.id);
            res.json(del);
        }
        catch(err)
        {
            res.status(500).send(err);
        }
    }

    //UPDATE-PUT
    public static async updateOrderProduct(req: Request, res:Response, next: NextFunction)
    {
        try{
            var order_product = new OrderProduct(req.body);
            const up = await OrderProductModel.updateOrderProductById(req.params.id, order_product);
            res.json(up);
        }
        catch(err)
        {
            res.status(500).send(err);
        }
    }

}
