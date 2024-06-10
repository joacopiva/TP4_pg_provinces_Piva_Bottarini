import DBConfig from '../configs/DBConfig.js';
import pkg from 'pg'
const { Client } = pkg;

export default class Event_LocationsRepository
{
    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try{
            await client.connect();
            const sql = `SELECT * FROM event_locations`;
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
            const sql = `SELECT * FROM event_locations WHERE id = ${id}`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    getIdLocationAsync = async (id_location) => 
    {
        let returnArray = null;
        const client = new Client(DBConfig);
        try{
            await client.connect();
            const sql = `SELECT * FROM locations WHERE id = ${id_location}`;
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
                INSERT INTO event_locations
                    (id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user)
                VALUES
                    ($1, $2, $3, $4, $5, $6, $7)
            `;
            
            const values =    
            [
                entity.id_location,
                entity.name,
                entity.full_address,
                entity.max_capacity,
                entity.latitude,
                entity.longitude,
                entity.id_creator_user
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
        `UPDATE event_locations 
        SET id_location = $1, name = $2, full_address = $3, max_capacity = $4, latitude = $5, longitude = $6, id_creator_user = $7
        WHERE id = ${entity.id}`;


        const values = 
        [
            entity.id_location,
            entity.name,
            entity.full_address,
            entity.max_capacity,
            entity.latitude,
            entity.longitude,
            entity.id_creator_user
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
        `DELETE FROM event_locations WHERE id = ${id}`;
        const result = await client.query(sql);
        await client.end();
        return result;
    }

}