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
            ['Chaco Provincia', 'Provincia de Chaco', -24.895086288452148, -59.93218994140625, 100];
        const result = await client.query(sql, values);
        await client.end();
        return result
    }

    updateAsync = async (entity) => 
    {

    }

    deleteByIdAsync = async (id) => 
    {

    }


}