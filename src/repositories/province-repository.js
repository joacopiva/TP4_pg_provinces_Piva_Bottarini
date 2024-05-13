import DBConfig from '../configs/DBConfig.js';
import pkg from 'pg'
const { Client } = pkg;

export default class ProvinceRepository {
    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try{
            await client.connect();
            const sql = `SELECT * FROM provinces`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    getByIdAsync = async (id) => 
    {
        let returnArray = null;
        const client = new Client(DBConfig);
        try{
            await client.connect();
            const sql = `SELECT * FROM provinces WHERE id = ${id}`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    createAsync = async (entity) => 
    {
        const client = new Client(DBConfig);
        await client.connect();
        const sql = 
        `
            INSERT INTO provinces
                (name, full_name, latitude, longitude, display_order)
            VALUES
                ($1, $2, $3, $4, $5)
        `;
        const values =    
        [
            entity.name,
            entity.full_name,
            entity.latitude,
            entity.longitude,
            entity.display_order
        ]

        const result = await client.query(sql, values);
        await client.end();
        return result
    }

    updateAsync = async (entity) => 
    {
        const client = new Client(DBConfig);
        await client.connect();
        const sql = 
        `UPDATE provinces 
        SET name = $1, full_name = $2, latitude = $3, longitude = $4, display_order = $5 
        WHERE id = ${entity.id}`;
        const values = 
        [
            entity.name,
            entity.full_name,
            entity.latitude,
            entity.longitude,
            entity.display_order
        ]
        const result = await client.query(sql, values);
        await client.end();
        return result;
    }
    

    deleteByIdAsync = async (id) => 
    {
        const client = new Client(DBConfig);
        await client.connect();
        const sql = 
        `DELETE FROM provinces WHERE id = ${id}`;
        const result = await client.query(sql);
        await client.end();
        return result;
    }
}