import{ connect} from'../Connections/myfone_db';

export class Product
{
    id: number;
    description : string;
    name: string;
    price : number;
    reference: number;


    constructor(data: any)
    {
        this.id = data.id;
        this.description = data.description;
        this.name = data.name;
        this.price = data.price;
        this.reference = data.reference ;
  
      
    }
}


export class ProductModel
{
    //GET ALL
    public static async getAll()
    {
        return connect().then((conn) =>
        {
            return conn.query('SELECT id, name, description, price, reference FROM products').then((results) => // je sélectionne tout sauf le password, qui peut être visible dans la console du front....
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
            return conn.query('SELECT id, name, description, price, reference FROM products WHERE id=?', id).then((results) =>
            {
                return results;
            });
        });

    }

 


    //INSERT en POST
    public static async insertProduct(product)
    {
        return connect().then((conn) =>
        {
            return conn.query('INSERT INTO products (name, description, price, reference) VALUES (?, ?, ?, ?)',
            [product.name, product.description, product.price, product.reference]).then(() =>
            {
                return this.getAll();
            });
        });
    }

    //DEELETE
    public static async deleteProductById(id)
    {
        return connect().then((conn) =>
        {
            return conn.query('DELETE from products WHERE id=?', id).then(()=>
            {
                return this.getAll();
            });
           
        });
    }

    //UPDDATE
    public static async updateProductById(id, product)
    {
        return connect().then((conn) =>
        {
            return conn.query('UPDATE products SET name=?, description=?, price=?, reference=? WHERE id=?',
            [product.name, product.description, product.price, product.reference,id]).then((results)=>
            {
                return this.getOneById(id); // on renvoie l'utilisateur qui a été modifié
            });
           
        });
    }



    //AUthentification

    // public static async checkPassword(username: string, password: string): Promise<any>
    // {
    //     try
    //     {
    //         let res = await connect().then((conn) => 
    //         {
    //             return conn.query('SELECT id, username, password, email, admin FROM users WHERE username=?', username).then((results) =>
    //             {
    //                 return results;
    //             });
    //         });
    
    //         if(res[0].password === password)
    //         {
    //             return {success:true, admin: res[0].admin};
    //         }
    //     } catch(err)
    //     {
    //         console.error('[ERROR] checkPassword username : ' + username + ' password : ' + password);
    //         //console.error(err);
    //     }
    //     return {success:false, admin:false};
    // }

    

    // // GET ONE BY NAME

    // public static async getOneByName(name:any)
    // {
    //     return connect().then((conn) =>
    //     {
    //         return conn.query('SELECT id, username, email FROM users where username=?', name).then((results)=>
    //         {
    //             return results;
    //         });
           
    //     });
    // }

    // //GET ONE By EMAIL

    // public static async getOneBEmail(email:any)
    // {
    //     return connect().then((conn) =>
    //     {
    //         return conn.query('SELEC T id, username, email FROM users where email=?', email).then((results)=>
    //         {
    //             return results;
    //         });
           
    //     });
    //}

    




}
