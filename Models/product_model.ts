import{ connect} from'../Connections/myfone_db';

export class Product
{
    id: number;
    description : string;
    name: string;
    price : number;
    reference: number;
    fk_model: number;
    img : string;


    constructor(data: any)
    {
        this.id = data.id;
        this.description = data.description;
        this.name = data.name;
        this.price = data.price;
        this.reference = data.reference ;
        this.fk_model = data.fk_model ;
        this.img = data.img;
    }
}


export class ProductModel
{
    //GET ALL
    public static async getAll()
    {
        return connect().then((conn) =>
        {
            return conn.query('SELECT * FROM products').then((results) =>
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
            return conn.query('SELECT id, name, description, price, reference, img FROM products WHERE id=?', id).then((results) =>
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
            return conn.query('INSERT INTO products (name, description, price, reference, fk_model) VALUES (?, ?, ?, ?, ?)',
            [product.name, product.description, product.price, product.reference, product.fk_model]).then(() =>
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
            return conn.query('UPDATE products SET name=?, description=?, price=?, reference=?, fk_model=? WHERE id=?',
            [product.name, product.description, product.price, product.reference, product.fk_model,id]).then((results)=>
            {
                return this.getOneById(id); 
            });
           
        });
    }



}
