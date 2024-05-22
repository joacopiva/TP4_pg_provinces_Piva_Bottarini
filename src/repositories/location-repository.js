import DBConfig from '../configs/DBConfig.js';
import pkg from 'pg'
const { Client } = pkg;

export default class LocationRepository
{
    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try{
            await client.connect();
            const sql = `SELECT * FROM locations`;
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
            const sql = `SELECT * FROM locations WHERE id = ${id}`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    // falta un get
}