import * as mysql from 'promise-mysql';



export function connect()
{
    return mysql.createConnection(
        {
            host: 'localhost',
            user: 'root', 
            password:'',
            database: 'myfonetest', 
            port: 3308
        });
}


