import{ connect} from'../Connections/myfone_db';

export class DetailsPhone
{
    id: number;
    screen_size: number;
    processor: number;
    capacity: number;
    ram: number;
    os_version:string;
    fk_products:number;
    

    constructor(data: any)
    {
        this.id = data.id;
        this.screen_size = data.screen_size;
        this.processor = data.processor;
        this.capacity = data.capacity;
        this.ram = data.ram;
        this.os_version = data.os_version;
        this.fk_products = data.fk_products;
      
    }
}


export class DetailsPhoneModel
{
    //GET ALL
    public static async getAll()
    {
        return connect().then((conn) =>
        {
            return conn.query('SELECT * FROM details_phone').then((results) => 
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
            return conn.query('SELECT * FROM details_phone WHERE id=?', id).then((results) =>
            {
                return results;
            });
        });

    }

 


    //INSERT en POST
    public static async insertDetailsPhone(details_phone)
    {
        
        return connect().then((conn) =>
        {
            return conn.query('INSERT INTO details_phone (screen_size, processor, capacity, ram, os_version, fk_products) VALUES (?, ?, ?, ?, ?, ?)',
            [details_phone.screen_size, details_phone.processor, details_phone.capacity, details_phone.ram, details_phone.os_version, details_phone.fk_products]).then(() =>
            {
                return this.getAll();
            });
        });

    }

    //DEELETE
    public static async deleteDetailsPhoneById(id)
    {
        return connect().then((conn) =>
        {
            return conn.query('DELETE from details_phone WHERE id=?', id).then(()=>
            {
                return this.getAll();
            });
           
        });
    }

    //UPDDATE
    public static async updateDetailsPhoneById(id, details_phone )
    {
        return connect().then((conn) =>
        {
            return conn.query('UPDATE details_phone SET screen_size=?, processor=?, capacity=?, ram=?, os_version=?, fk_products=? WHERE id=?',
            [details_phone.screen_size, details_phone.processor, details_phone.capacity, details_phone.ram, details_phone.os_version, details_phone.fk_products, id]).then((results)=>
            {
                return this.getOneById(id); 
            });
           
        });
    }

       //Get One By Product Id : pour voiur les détails des produits dans le front
       public static async getOneByProductId(id)
       {
           return connect().then((conn) =>
           {
               return conn.query('SELECT * FROM details_phone WHERE fk_products=?', [id] ).then((results) => 
               {
                   return results;
               });
           });
       }

}
