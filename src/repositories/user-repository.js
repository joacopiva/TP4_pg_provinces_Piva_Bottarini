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
}