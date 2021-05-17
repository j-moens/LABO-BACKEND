import{ connect} from'../Connections/myfone_db';

export class Brand
{
    id: number;
 name:string;
    

    constructor(data: any)
    {
        this.id = data.id;
        this.name = data.name;
      
    }
}


export class BrandModel
{
    //GET ALL
    public static async getAll()
    {
        return connect().then((conn) =>
        {
            return conn.query('SELECT id, name FROM brand').then((results) => 
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
            return conn.query('SELECT id, name FROM brand WHERE id=?', id).then((results) =>
            {
                return results;
            });
        });

    }

 


    //INSERT en POST
    public static async insertBrand(brand)
    {
        return connect().then((conn) =>
        {
            return conn.query('INSERT INTO brand (name) VALUES (?)',
            [brand.name]).then(() =>
            {
                return this.getAll();
            });
        });
    }

    //DEELETE
    public static async deleteBrandById(id)
    {
        return connect().then((conn) =>
        {
            return conn.query('DELETE from brand WHERE id=?', id).then(()=>
            {
                return this.getAll();
            });
           
        });
    }

    //UPDDATE
    public static async updateBrandById(id, brand)
    {
        return connect().then((conn) =>
        {
            return conn.query('UPDATE brand SET name=? WHERE id=?',
            [brand.name, id]).then((results)=>
            {
                return this.getOneById(id); // on renvoie l'utilisateur qui a été modifié
            });
           
        });
    }



    //AUthentification

    // public static async checkPassword(brandname: string, password: string): Promise<any>
    // {
    //     try
    //     {
    //         let res = await connect().then((conn) => 
    //         {
    //             return conn.query('SELECT id, brandname, password, email, admin FROM brands WHERE brandname=?', brandname).then((results) =>
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
    //         console.error('[ERROR] checkPassword brandname : ' + brandname + ' password : ' + password);
    //         //console.error(err);
    //     }
    //     return {success:false, admin:false};
    // }

    

    // // GET ONE BY NAME

    // public static async getOneByName(name:any)
    // {
    //     return connect().then((conn) =>
    //     {
    //         return conn.query('SELECT id, brandname, email FROM brands where brandname=?', name).then((results)=>
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
    //         return conn.query('SELEC T id, brandname, email FROM brands where email=?', email).then((results)=>
    //         {
    //             return results;
    //         });
           
    //     });
    //}

    




}
