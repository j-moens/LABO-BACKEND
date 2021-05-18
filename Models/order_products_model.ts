import{ connect} from'../Connections/myfone_db';

export class OrderProduct
{
    id: number;
    fk_order : number;
    fk_products : number;
    quantity: number;



    constructor(data: any)
    {
        this.id = data.id;
        this.fk_order = data.fk_order;
        this.fk_products = data.fk_products;
        this.quantity = data.quantity;
  
      
    }
}


export class OrderProductModel
{
    //GET ALL
    public static async getAll()
    {
        return connect().then((conn) =>
        {
            return conn.query('SELECT * FROM order_products').then((results) =>
            {
                return results;
            });
        });
    }

    //GET ONE BY ID
    public static async getOneById(id)
    {
        return connect().then((conn) =>
        {
            return conn.query('SELECT * FROM order_products WHERE id=?', id).then((results) =>
            {
                return results;
            });
        });

    }

 


    //INSERT en POST
    public static async insertOrderProduct(order_products)
    {
        return connect().then((conn) =>
        {
            return conn.query('INSERT INTO order_products (fk_order, fk_products, quantity) VALUES (?, ?, ?)',
            [order_products.fk_order, order_products.fk_products, order_products.quantity]).then(() =>
            {
                return this.getAll();
            });
        });
    }

    //DEELETE
    public static async deleteOrderProductById(id)
    {
        return connect().then((conn) =>
        {
            return conn.query('DELETE from order_products WHERE id=?', id).then(()=>
            {
                return this.getAll();
            });
           
        });
    }

    //UPDDATE
    public static async updateOrderProductById(id, order_products)
    {
        return connect().then((conn) =>
        {
            return conn.query('UPDATE order_products SET fk_order=?, fk_products=?, quantity=? WHERE id=?',
            [order_products.fk_order, order_products.fk_products, order_products.quantity, id]).then((results)=>
            {
                return this.getOneById(id); 
            });
           
        });
    }

}
