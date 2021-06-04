import { Router, Request, Response, NextFunction } from 'express';
import{Basket} from '../Models/basket_model';

export class BasketController
{
    
   

    saveCart(request) {
        if(request.sessionStorage) {
            sessionStorage.cart;
        }
    }
 
     }