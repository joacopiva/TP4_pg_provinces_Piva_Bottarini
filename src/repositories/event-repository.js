import DBConfig from '../configs/DBConfig.js';
import pkg from 'pg'
const { Client } = pkg;

export default class EventRepository
{
    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try{
            await client.connect();
            const sql = `SELECT * FROM events`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    getBySTAsync = async (query) => 
    {
        let returnArray = null;
        const client = new Client(DBConfig);
        try{
            await client.connect();
            const sql = query;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    GetId_category = async (category) => 
    {
        let returnArray = null;
        const client = new Client(DBConfig);
        try{
            await client.connect();
            const sql = `SELECT * FROM event_categories WHERE name = ${category}`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    getEvent = async (query) =>
    {
        const client = new Client(DBConfig);
        try
        {
            await client_encoding.connect();

            let sql = 
            `
            SELECT events.*, event_categories.name AS category_name
            FROM events
            LEFT JOIN event_categories ON events.id_event_category = event_categories.id
            `;

            const queryParams = [];

            if(query.tag)
            {
                sql += ' INNER JOIN event_tags ON events.id = event_tags.id.event';
                sql += ' INNER JOIN tags ON event_tags.id_tag = tags.id';
                sql += (queryParams.length > 0 ? ' AND' : ' WHERE') + ' tags.name = $' + (queryParams.length + 1);
                queryParams.push(query.startdate);
            }

            if(query.startdate)
            {
                sql += (queryParams.length > 0 ? ' AND' : ' WHERE') + ' start_date = $' + (queryParams.length + 1);
                queryParams.push(query.startdate);
            }

            if(query.name)
            {
                sql += (queryParams.length > 0 ? ' AND' : ' WHERE') + 'lower(events.name) = lower($' + (queryParams.length + 1) + ')';
                queryParams.push(query.category);
            }

            if(query.category)
            {
                sql += (queryParams.length > 0 ? ' AND' : ' WHERE') + 'lower(event_categories.name) = lower($' + (queryParams.length + 1) + ')';
            }
             
        }
        catch (error)
        {
            console.log(error)
        }
    }
}