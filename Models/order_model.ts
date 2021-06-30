import{ connect} from'../Connections/myfone_db';

export class Order
{
    reference: number;
    delivery_time : Date;
    shipping_cost: number;
    fk_users : number;
    order_complete : boolean;

    constructor(data: any)
    {
        this.reference = data.id;
        this.delivery_time = data.delivery_time;
        this.shipping_cost = data.shipping_cost;
        this.fk_users = data.fk_users;
        this.order_complete = data.order_complete;
      
    }
}


export class OrderModel
{
    //GET ALL
    public static async getAll()
    {
        return connect().then((conn) =>
        {
            return conn.query('SELECT * FROM orders').then((results) => 
            {
                return results;
            });
        });
    }

    //GET ONE BY ID
    // public static async getOneById(reference)
    // {
    //     return connect().then((conn) =>
    //     {
    //         return conn.query('SELECT * FROM orders WHERE reference=?', reference).then((results) =>
    //         {
    //             return results;
    //         });
    //     });

    // }

    public static async getOneById(reference)
    {
        return connect().then((conn) =>
        {
            return conn.query('SELECT * FROM orders INNER JOIN users WHERE orders.fk_users = users.id', reference).then((results) =>
            {
                return results;
            });
        });

    }



    //INSERT en POST
    public static async insertOrder(order)
    {
        
        return connect().then((conn) =>
        {
            return conn.query('INSERT INTO orders (delivery_time, shipping_cost, fk_users) VALUES (?, ?, ?)',
            [order.delivery_time, order.shipping_cost, order.fk_users]).then((results) =>
            {
                console.log(results);
               //return this.getOneById(results.insertedId);
               return results.insertId;
            });

        });
    }

    //DEELETE
    public static async deleteOrderById(reference)
    {
        return connect().then((conn) =>
        {
            return conn.query('DELETE from orders WHERE reference=?', reference).then(()=>
            {
                return this.getAll();
            });
           
        });
    }

    //UPDDATE
    public static async updateOrderById(reference, order)
    {
        return connect().then((conn) =>
        {
            return conn.query('UPDATE orders SET delivery_time=?, shipping_cost=?, fk_users=? WHERE reference=?',
            [order.delivery_time, order.shipping_cost, order.fk_users, reference]).then((results)=>
            {
                return this.getOneById(reference); 
            });
           
        });
    }
}
