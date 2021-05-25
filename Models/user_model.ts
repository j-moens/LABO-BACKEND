import{ connect} from'../Connections/myfone_db';

export class User
{
    id: number;
    lastname: string;
    firstname: string;
    email: string;
    password:string;

    number_street : string;
    street : string;
    zipcode : number;
    city : string;
    country : string;
    extra_info : string;
    gender : string;
    birth_date: Date;
    phone_number : string;
    
    admin: boolean;

    constructor(data: any)
    {
        this.id = data.id;
        this.lastname= data.lastname;
        this.firstname = data.firstname;
        this.email = data.email;
        this.password = data.password;

        this.number_street = data.number_street;
        this.street = data.street;
        this.zipcode = data.zipcode;
        this.city = data.city;
        this.country = data.country;
        this.extra_info = data.extra_info;
        this.gender = data.gender;
        this.birth_date = data.birth_date;
        this.phone_number = data.phone_number;

        this.admin = data.admin? data.admin: 0;
      
    }
}


export class UserModel
{
    //GET ALL
    public static async getAll()
    {
        return connect().then((conn) =>
        {
            return conn.query('SELECT id, firstname, lastname, email, phone_number, number_street, street, zipcode, city, country, extra_info, gender, birth_date, admin FROM users').then((results) => // je sélectionne tout sauf le password, qui peut être visible dans la console du front....
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
            return conn.query('SELECT id, firstname, lastname, email, phone_number, number_street, street, zipcode, city, country, extra_info, gender, birth_date, admin FROM users  WHERE id=?', id).then((results) =>
            {
                return results;
            });
        });

    }

 


    //INSERT en POST
    public static async insertUser(user)
    {
        return connect().then((conn) =>
        {
            return conn.query('INSERT INTO users (firstname, lastname, email, phone_number, password, number_street, street, zipcode, city, country, extra_info, gender, birth_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [user.firstname, user.lastname, user.email, user.phone_number, user.password, user.number_street, user.street, user.zipcode, user.city, user.country, user.extra_info, user.gender, null ]).then(() =>
            {
                return this.getAll();
            });
        });
    }

    //DEELETE
    public static async deleteUserById(id)
    {
        return connect().then((conn) =>
        {
            return conn.query('DELETE from users WHERE id=?', id).then(()=>
            {
                return this.getAll();
            });
           
        });
    }

    //UPDDATE
    public static async updateUserById(id, user)
    {
        return connect().then((conn) =>
        {
            return conn.query('UPDATE users SET firstname=?, lastname=?, email=?, phone_number=?, password=?, number_street=?, street=?, zipcode=?, city=?, country=?, extra_info=?, gender=?, birth_date=? WHERE id=?',
            [user.firstname, user.lastname, user.email, user.phone_number, user.password, user.number_street, user.street, user.zipcode, user.city, user.country, user.extra_info, user.gender, user.birth_date, id]).then((results)=>
            {
                return this.getOneById(id); // on renvoie l'utilisateur qui a été modifié
            });
           
        });
    }



    AUthentification

    public static async checkPassword(email: string, password: string): Promise<any>
    {
        try
        {
            let res = await connect().then((conn) => 
            {
                return conn.query('SELECT id, firstname, lastname, password, email, admin FROM users WHERE email=?', email).then((results) =>
                {
                    return results;
                });
            });
    
            if(res[0].password === password)
            {
                return {success:true, admin: res[0].admin, id: res[0].id};
            }
        } catch(err)
        {
            console.error('[ERROR] checkPassword username : ' + email+ ' password : ' + password);
            //console.error(err);
        }
        return {success:false, admin:false, id:0};
    }

    

    // GET ONE BY NAME

    public static async getOneByName(name:any)
    {
        return connect().then((conn) =>
        {
            return conn.query('SELECT id, firstname, lastname, email FROM users where email=?', name).then((results)=>
            {
                return results;
            });
           
        });
    }

    //GET ONE By EMAIL

    public static async getOneBEmail(email:any)
    {
        return connect().then((conn) =>
        {
            return conn.query('SELECT id, firstname, lastname, email FROM users where email=?', email).then((results)=>
            {
                return results;
            });
           
        });
    }

    




}
