import { password } from 'pg/lib/defaults.js';
import DBConfig from '../configs/DBConfig.js';
import pkg from 'pg'
const { Client } = pkg;

export default class UserRepository
{
    createAsync = async (entity) => 
    {
        
        const client = new Client(DBConfig);
        await client.connect();
        
            const sql = 
            `
                INSERT INTO users
                    (first_name, last_name, username, password)
                VALUES
                    ($1, $2, $3, $4)
            `;
            
            const values =    
            [
                entity.first_name,
                entity.last_name,
                entity.username,
                entity.password
            ]

            const result = await client.query(sql, values);
            await client.end();
            return result
        
    }

    getByUsernamePassword = async (username, password) => 
    {
        let returnArray = null;
        const client = new Client(DBConfig);
        try{
            await client.connect();
            const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
    LogIn = async (username, password) =>
    {
        
    } 

}