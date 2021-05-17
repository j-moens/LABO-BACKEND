import{ connect} from'../Connections/myfone_db';

export class Model
{
    id: number;
 name:string;
 fk_brand: number;
    

    constructor(data: any)
    {
        this.id = data.id;
        this.name = data.name;
        this.fk_brand = data.fk_brand;
      
    }
}


export class ModelModel
{
    //GET ALL
    public static async getAll()
    {
        return connect().then((conn) =>
        {
            return conn.query('SELECT * FROM model').then((results) => 
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
            return conn.query('SELECT * FROM model WHERE id=?', id).then((results) =>
            {
                return results;
            });
        });

    }

 


    //INSERT en POST
    public static async insertModel(model)
    {
        return connect().then((conn) =>
        {
            return conn.query('INSERT INTO model (name, fk_brand) VALUES (?, ?)',
            [model.name, model.fk_brand]).then(() =>
            {
                return this.getAll();
            });
        });
    }

    //DEELETE
    public static async deleteModelById(id)
    {
        return connect().then((conn) =>
        {
            return conn.query('DELETE from model WHERE id=?', id).then(()=>
            {
                return this.getAll();
            });
           
        });
    }

    //UPDDATE
    public static async updateModelById(id, model)
    {
        return connect().then((conn) =>
        {
            return conn.query('UPDATE model SET name=?, fk_brand=? WHERE id=?',
            [model.name, id]).then((results)=>
            {
                return this.getOneById(id); // on renvoie l'utilisateur qui a été modifié
            });
           
        });
    }
}
