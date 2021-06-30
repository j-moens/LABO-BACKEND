import { Router, Request, Response, NextFunction } from 'express';
import{Order, OrderModel} from '../Models/order_model';
import { OrderProduct, OrderProductModel } from '../Models/order_products_model';
import { Product, ProductModel } from '../Models/product_model';

export class OrderController
{
    //GET ALL
    public static async getAll(req: Request, res:Response, next: NextFunction)
    {
         const results =  await OrderModel.getAll();
         res.json(results);
       
    }

    //GET ONE BY ID
    public static async getOneById(req: Request, res:Response, next: NextFunction)
    {
         const results =  await OrderModel.getOneById(req.params.id);
         res.json(results);
       
    }

    

    //CREATE ( INSERT) - POST
    public static async createOrder(req: Request, res:Response, next: NextFunction)
    {
        try{
            var order = new Order(req.body);
            
        order.reference =  await OrderModel.insertOrder(order);
        const products = req.body.products;
        products.forEach(element => {
            OrderProductModel.insertOrderProduct(new OrderProduct({
                fk_order : order.reference, fk_products : element.id, quantity: element.qty    
            }));
                
        });
        
        res.json({ 
            success: true, message: 'commande passée'});
        

        }catch(err)
        {
            res.status(500).send(err);
        }
    }

    //DELETE
    public static async deleteOrder(req: Request, res:Response, next: NextFunction)
    {
        try{

            const del = await OrderModel.deleteOrderById(req.params.id);
            res.json(del);
        }
        catch(err)
        {
            res.status(500).send(err);
        }
    }

    //UPDATE-PUT
    public static async updateOrder(req: Request, res:Response, next: NextFunction)
    {
        try{
            var order = new Order(req.body);
            const up = await OrderModel.updateOrderById(req.params.id, order);
            res.json(up);
        }
        catch(err)
        {
            res.status(500).send(err);
        }
    }

}
