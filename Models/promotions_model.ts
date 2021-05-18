import{ connect} from'../Connections/myfone_db';

export class Promotion
{
    id: number;
  name : string;
  reduction : number;
  promo_gift : string;


    constructor(data: any)
    {
        this.id = data.id;
        this.name = data.name;
        this.reduction = data.reduction;
        this.promo_gift = data.promo_gift;

  
      
    }
}


export class PromotionModel
{
    //GET ALL
    public static async getAll()
    {
        return connect().then((conn) =>
        {
            return conn.query('SELECT * FROM promotions').then((results) =>
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
            return conn.query('SELECT * FROM promotions WHERE id=?', id).then((results) =>
            {
                return results;
            });
        });

    }

 


    //INSERT en POST
    public static async insertPromotion(promotions)
    {
        return connect().then((conn) =>
        {
            return conn.query('INSERT INTO promotions (name, reduction, promo_gift) VALUES (?, ?, ?)',
            [promotions.name, promotions.reduction, promotions.promo_gift]).then(() =>
            {
                return this.getAll();
            });
        });
    }

    //DEELETE
    public static async deletePromotionById(id)
    {
        return connect().then((conn) =>
        {
            return conn.query('DELETE from promotions WHERE id=?', id).then(()=>
            {
                return this.getAll();
            });
           
        });
    }

    //UPDDATE
    public static async updatePromotionById(id, promotions)
    {
        return connect().then((conn) =>
        {
            return conn.query('UPDATE promotions SET name=?, reduction=?, promo_gift=? WHERE id=?',
            [promotions.name, promotions.reduction, promotions.promo_gift, id]).then((results)=>
            {
                return this.getOneById(id); 
            });
           
        });
    }

}
